"""
Image Review Tool
-----------------
Serves a local page where you can compare the original extracted crop
vs the Yandex-downloaded high-res for each product, then approve or reject.
Results are saved to extracted-images/high-res/decisions.json.

Run with:  python scripts/review_images.py
Then open: http://localhost:8765
"""

import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

BASE_DIR = Path(__file__).resolve().parent.parent
ORIGINAL_DIR = BASE_DIR / "extracted-images"
HIGH_RES_DIR = BASE_DIR / "extracted-images" / "high-res"
DECISIONS_FILE = HIGH_RES_DIR / "decisions.json"
PORT = 8765

# Load all products (files like amor-1.png in high-res/)
def get_products():
    items = sorted(HIGH_RES_DIR.glob("*.png"), key=lambda p: (p.stem.rsplit("-", 1)[0], int(p.stem.rsplit("-", 1)[1])))
    products = []
    for hr in items:
        orig = ORIGINAL_DIR / hr.name
        products.append({
            "id": hr.stem,
            "name": hr.stem,
            "high_res": hr.name,
            "original_exists": orig.exists(),
        })
    return products

def load_decisions():
    if DECISIONS_FILE.exists():
        return json.loads(DECISIONS_FILE.read_text())
    return {}

def save_decisions(decisions):
    DECISIONS_FILE.write_text(json.dumps(decisions, indent=2, ensure_ascii=False))

PRODUCTS = get_products()

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Revisión de Imágenes — Con Cariño</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0f0f13;
    color: #e0e0e8;
    min-height: 100vh;
  }

  header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-bottom: 1px solid #2a2a4a;
    padding: 20px 32px;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  header h1 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
  }

  .stats {
    display: flex;
    gap: 16px;
    font-size: 0.82rem;
  }

  .stat { display: flex; align-items: center; gap: 6px; }
  .stat-dot { width: 8px; height: 8px; border-radius: 50%; }
  .dot-pending { background: #6b7280; }
  .dot-approved { background: #22c55e; }
  .dot-rejected { background: #ef4444; }

  .header-actions { display: flex; gap: 10px; }

  .btn {
    padding: 8px 18px;
    border-radius: 8px;
    border: none;
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-approve-all { background: #22c55e; color: #000; }
  .btn-approve-all:hover { background: #16a34a; }
  .btn-reject-all { background: #ef4444; color: #fff; }
  .btn-reject-all:hover { background: #dc2626; }
  .btn-save { background: #6366f1; color: #fff; }
  .btn-save:hover { background: #4f46e5; }

  .progress-bar {
    height: 3px;
    background: #1e1e2e;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    transition: width 0.3s ease;
  }

  main {
    padding: 24px 32px;
    max-width: 1600px;
    margin: 0 auto;
  }

  .filter-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    align-items: center;
  }

  .filter-bar label { font-size: 0.82rem; color: #888; }

  .filter-btn {
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid #2a2a4a;
    background: transparent;
    color: #888;
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
  }
  .filter-btn.active, .filter-btn:hover {
    background: #2a2a4a;
    color: #fff;
    border-color: #6366f1;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 20px;
  }

  .card {
    background: #16161f;
    border: 1px solid #2a2a3a;
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .card.approved { border-color: #22c55e; }
  .card.rejected { border-color: #ef4444; }
  .card.pending { border-color: #2a2a3a; }

  .card-header {
    padding: 12px 16px;
    background: #1a1a28;
    border-bottom: 1px solid #2a2a3a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-id {
    font-size: 0.78rem;
    font-weight: 600;
    color: #a0a0c0;
    font-family: 'Courier New', monospace;
  }

  .status-badge {
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .badge-pending { background: #2a2a3a; color: #6b7280; }
  .badge-approved { background: #14532d; color: #22c55e; }
  .badge-rejected { background: #450a0a; color: #ef4444; }

  .images-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .img-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 10px 8px;
    gap: 6px;
  }

  .img-panel:first-child {
    border-right: 1px solid #2a2a3a;
  }

  .img-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .img-panel img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    background: #0d0d15;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.15s;
  }

  .img-panel img:hover { transform: scale(1.02); }

  .img-size {
    font-size: 0.68rem;
    color: #444;
  }

  .card-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-top: 1px solid #2a2a3a;
  }

  .card-actions button {
    padding: 10px;
    border: none;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
  }

  .btn-card-approve {
    background: #14532d;
    color: #22c55e;
    border-right: 1px solid #2a2a3a;
  }
  .btn-card-approve:hover { background: #166534; }
  .btn-card-approve.selected { background: #22c55e; color: #000; }

  .btn-card-reject {
    background: #450a0a;
    color: #ef4444;
  }
  .btn-card-reject:hover { background: #7f1d1d; }
  .btn-card-reject.selected { background: #ef4444; color: #fff; }

  /* Lightbox */
  #lightbox {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.9);
    z-index: 999;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
  }
  #lightbox.open { display: flex; }
  #lightbox img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
  }

  .toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #22c55e;
    color: #000;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 0.85rem;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.2s;
    pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateY(0); }
  .toast.error { background: #ef4444; color: #fff; }

  .hidden { display: none !important; }
</style>
</head>
<body>

<div id="lightbox">
  <img id="lightbox-img" src="" alt="Full size">
</div>
<div class="toast" id="toast"></div>

<header>
  <div>
    <h1>🍓 Revisión de Imágenes — Con Cariño</h1>
  </div>
  <div class="stats">
    <div class="stat"><div class="stat-dot dot-pending"></div><span id="stat-pending">0 pendientes</span></div>
    <div class="stat"><div class="stat-dot dot-approved"></div><span id="stat-approved">0 aprobadas</span></div>
    <div class="stat"><div class="stat-dot dot-rejected"></div><span id="stat-rejected">0 rechazadas</span></div>
  </div>
  <div class="header-actions">
    <button class="btn btn-approve-all" onclick="bulkDecide('approved')">✓ Aprobar visibles</button>
    <button class="btn btn-reject-all" onclick="bulkDecide('rejected')">✗ Rechazar visibles</button>
    <button class="btn btn-save" onclick="saveDecisions()">💾 Guardar</button>
  </div>
</header>

<div class="progress-bar">
  <div class="progress-fill" id="progress-fill" style="width:0%"></div>
</div>

<main>
  <div class="filter-bar">
    <label>Filtrar:</label>
    <button class="filter-btn active" data-filter="all" onclick="setFilter('all', this)">Todos</button>
    <button class="filter-btn" data-filter="pending" onclick="setFilter('pending', this)">Pendientes</button>
    <button class="filter-btn" data-filter="approved" onclick="setFilter('approved', this)">Aprobados</button>
    <button class="filter-btn" data-filter="rejected" onclick="setFilter('rejected', this)">Rechazados</button>
  </div>

  <div class="grid" id="grid">
    __CARDS__
  </div>
</main>

<script>
const decisions = __DECISIONS__;
let currentFilter = 'all';

function statusOf(id) {
  return decisions[id] || 'pending';
}

function updateCard(id) {
  const card = document.getElementById('card-' + id);
  const st = statusOf(id);
  card.className = 'card ' + st;
  card.querySelector('.status-badge').className = 'status-badge badge-' + st;
  card.querySelector('.status-badge').textContent = st === 'pending' ? 'Pendiente' : st === 'approved' ? 'Aprobada ✓' : 'Rechazada ✗';
  card.querySelector('.btn-card-approve').classList.toggle('selected', st === 'approved');
  card.querySelector('.btn-card-reject').classList.toggle('selected', st === 'rejected');
  card.style.display = (currentFilter === 'all' || currentFilter === st) ? '' : 'none';
  updateStats();
}

function decide(id, decision) {
  decisions[id] = decision;
  updateCard(id);
}

function bulkDecide(decision) {
  document.querySelectorAll('.card').forEach(card => {
    if (card.style.display !== 'none') {
      const id = card.id.replace('card-', '');
      decisions[id] = decision;
      updateCard(id);
    }
  });
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    const id = card.id.replace('card-', '');
    const st = statusOf(id);
    card.style.display = (filter === 'all' || filter === st) ? '' : 'none';
  });
}

function updateStats() {
  const all = Object.values(decisions);
  const approved = all.filter(v => v === 'approved').length;
  const rejected = all.filter(v => v === 'rejected').length;
  const total = document.querySelectorAll('.card').length;
  const pending = total - approved - rejected;
  document.getElementById('stat-pending').textContent = pending + ' pendientes';
  document.getElementById('stat-approved').textContent = approved + ' aprobadas';
  document.getElementById('stat-rejected').textContent = rejected + ' rechazadas';
  const done = approved + rejected;
  document.getElementById('progress-fill').style.width = (done / total * 100) + '%';
}

async function saveDecisions() {
  try {
    const res = await fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(decisions)
    });
    if (res.ok) showToast('✓ Decisiones guardadas', false);
    else showToast('Error al guardar', true);
  } catch(e) {
    showToast('Error: ' + e.message, true);
  }
}

function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => t.className = 'toast', 2500);
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
document.querySelectorAll('.img-panel img').forEach(img => {
  img.addEventListener('click', e => {
    e.stopPropagation();
    lbImg.src = img.src;
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', () => lightbox.classList.remove('open'));

updateStats();
</script>
</body>
</html>
"""

def build_cards(products, decisions):
    cards_html = []
    for p in products:
        pid = p["id"]
        decision = decisions.get(pid, "pending")
        badge_class = f"badge-{decision}"
        badge_text = {"pending": "Pendiente", "approved": "Aprobada ✓", "rejected": "Rechazada ✗"}[decision]
        card_class = decision

        orig_src = f"/original/{p['high_res']}" if p["original_exists"] else ""
        hr_src = f"/highres/{p['high_res']}"

        orig_panel = f"""
        <div class="img-panel">
          <div class="img-label">Original (crop)</div>
          {'<img src="' + orig_src + '" alt="Original" title="Click para ampliar">' if p['original_exists'] else '<div style="height:180px;display:flex;align-items:center;justify-content:center;color:#444;font-size:0.75rem;">No encontrado</div>'}
        </div>""" if p["original_exists"] else f"""
        <div class="img-panel">
          <div class="img-label">Original (crop)</div>
          <div style="height:180px;display:flex;align-items:center;justify-content:center;color:#444;font-size:0.75rem;width:100%">Sin original</div>
        </div>"""

        card = f"""
        <div class="card {card_class}" id="card-{pid}">
          <div class="card-header">
            <span class="card-id">{pid}</span>
            <span class="status-badge {badge_class}">{badge_text}</span>
          </div>
          <div class="images-row">
            {orig_panel}
            <div class="img-panel">
              <div class="img-label">Descargada (Yandex)</div>
              <img src="{hr_src}" alt="High-res" title="Click para ampliar">
            </div>
          </div>
          <div class="card-actions">
            <button class="btn-card-approve {'selected' if decision == 'approved' else ''}"
                    onclick="decide('{pid}', 'approved')">✓ Aprobar</button>
            <button class="btn-card-reject {'selected' if decision == 'rejected' else ''}"
                    onclick="decide('{pid}', 'rejected')">✗ Rechazar</button>
          </div>
        </div>"""
        cards_html.append(card)
    return "\n".join(cards_html)


class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # suppress logs

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/" or path == "":
            decisions = load_decisions()
            cards = build_cards(PRODUCTS, decisions)
            html = HTML_TEMPLATE.replace("__CARDS__", cards)
            html = html.replace("__DECISIONS__", json.dumps(decisions))
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))

        elif path.startswith("/original/"):
            fname = path[len("/original/"):]
            fpath = ORIGINAL_DIR / fname
            self._serve_file(fpath)

        elif path.startswith("/highres/"):
            fname = path[len("/highres/"):]
            fpath = HIGH_RES_DIR / fname
            self._serve_file(fpath)

        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/save":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            data = json.loads(body)
            save_decisions(data)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"ok":true}')
        else:
            self.send_response(404)
            self.end_headers()

    def _serve_file(self, fpath):
        if fpath.exists():
            ext = fpath.suffix.lower()
            ctype = "image/png" if ext == ".png" else "image/jpeg"
            self.send_response(200)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(fpath.stat().st_size))
            self.end_headers()
            self.wfile.write(fpath.read_bytes())
        else:
            self.send_response(404)
            self.end_headers()


if __name__ == "__main__":
    server = HTTPServer(("localhost", PORT), Handler)
    print(f"✓ Servidor de revisión corriendo en http://localhost:{PORT}")
    print(f"  Abre esa URL en tu navegador para revisar las imágenes.")
    print(f"  Las decisiones se guardan en: {DECISIONS_FILE}")
    print(f"  Ctrl+C para detener.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
