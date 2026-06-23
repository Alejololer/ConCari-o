import os
import json
import fitz
import unicodedata
import numpy as np
from PIL import Image
import itertools

pdf_files = [
    ("amor", "Valentine's Day 2026 @con.cariño..pdf"),
    ("mama", "dia delas madres.pdf"),
    ("papa", "Dia del padre (1) (1).pdf"),
    ("mujer", "DIA DE LA MUJER.pdf"),
    ("navidad", "NAVIDAD 2025 (3).pdf"),
    ("nino", "DIA DEL NIÑO.pdf")
]

workspace = r"C:\Users\acarl\Documents\ConCariño"
output_dir = os.path.join(workspace, "extracted-images")
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def get_product_page(campaign, product_index):
    # product_index is 1-based (1 to N)
    # returns 0-based page index in the PDF document
    if campaign == "amor":
        return (product_index - 1) // 3 + 1
    elif campaign == "mama":
        return (product_index - 1) // 3 + 1
    elif campaign == "papa":
        if product_index <= 3:
            return 1
        elif product_index <= 6:
            return 2
        elif product_index <= 9:
            return 3
        elif product_index <= 12:
            return 4
        elif product_index <= 14:
            return 5
        elif product_index <= 17:
            return 6
        else:
            return 7
    elif campaign == "mujer":
        return (product_index - 1) // 3 + 1
    elif campaign == "nino":
        return (product_index - 1) // 3 + 1
    elif campaign == "navidad":
        return (product_index - 1) // 3 + 1
    return 1

def clean_text(t):
    t = "".join(c for c in unicodedata.normalize('NFD', t) if unicodedata.category(c) != 'Mn')
    t = "".join(c.lower() for c in t if c.isalnum() or c.isspace())
    t = t.replace("christmas", "chrismas") # normalize spelling of Christmas
    return " ".join(t.split())

def match_product(prod_name, block_text):
    c_prod = clean_text(prod_name)
    c_block = clean_text(block_text)
    if not c_prod or not c_block:
        return False
    return c_prod in c_block or c_block in c_prod

def find_best_matching(products, images):
    n = len(products)
    m = len(images)
    if n == 0 or m == 0:
        return {p[0]: None for p in products}
        
    best_matching = {}
    min_total_dist = float('inf')
    
    if m >= n:
        for chosen_img_indices in itertools.combinations(range(m), n):
            for perm in itertools.permutations(chosen_img_indices):
                total_dist = 0
                for i in range(n):
                    p_center = products[i][1]
                    img_center = images[perm[i]][1]
                    dist = np.sqrt((p_center[0] - img_center[0]) ** 2 + (p_center[1] - img_center[1]) ** 2)
                    total_dist += dist
                if total_dist < min_total_dist:
                    min_total_dist = total_dist
                    best_matching = {products[i][0]: images[perm[i]] for i in range(n)}
    else:
        for chosen_prod_indices in itertools.combinations(range(n), m):
            for perm in itertools.permutations(range(m)):
                total_dist = 0
                for i in range(m):
                    p_center = products[chosen_prod_indices[i]][1]
                    img_center = images[perm[i]][1]
                    dist = np.sqrt((p_center[0] - img_center[0]) ** 2 + (p_center[1] - img_center[1]) ** 2)
                    total_dist += dist
                if total_dist < min_total_dist:
                    min_total_dist = total_dist
                    best_matching = {products[chosen_prod_indices[i]][0]: images[perm[i]] for i in range(m)}
                    for j in range(n):
                        prod_id = products[j][0]
                        if prod_id not in best_matching:
                            best_matching[prod_id] = None
                            
    return best_matching

# Main processing
results = {}

for name, filename in pdf_files:
    json_path = os.path.join(workspace, "tmp-catalog", f"{name}.json")
    pdf_path = os.path.join(workspace, filename)
    
    print(f"\nProcessing campaign: {name}")
    with open(json_path, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    doc = fitz.open(pdf_path)
    
    # Locate all products in the PDF (each page contains specific products)
    located_products = []
    for idx, p in enumerate(products):
        prod_id = f"{name}-{idx+1}"
        prod_name = p["name"]
        expected_page = get_product_page(name, idx + 1)
        
        # Only search on the expected page
        page = doc[expected_page]
        found = False
        
        # 1. Search text blocks for product name
        for block in page.get_text("blocks"):
            x0, y0, x1, y1, text, _, _ = block
            if match_product(prod_name, text):
                center = ((x0 + x1) / 2, (y0 + y1) / 2)
                located_products.append({
                    "id": prod_id,
                    "name": prod_name,
                    "page": expected_page,
                    "center": center,
                    "text_bbox": (x0, y0, x1, y1)
                })
                found = True
                break
                
        # 2. Fallback: Search for price on the expected page if name not found directly
        if not found:
            price_str = f"{p['price']:.2f}"
            price_str_alt = f"{p['price']:.1f}" if p['price'] % 1 == 0 else f"{p['price']}"
            price_str_comma = price_str.replace(".", ",")
            price_str_alt_comma = price_str_alt.replace(".", ",")
            
            for block in page.get_text("blocks"):
                x0, y0, x1, y1, text, _, _ = block
                if price_str in text or price_str_alt in text or price_str_comma in text or price_str_alt_comma in text:
                    center = ((x0 + x1) / 2, (y0 + y1) / 2)
                    located_products.append({
                        "id": prod_id,
                        "name": prod_name,
                        "page": expected_page,
                        "center": center,
                        "text_bbox": (x0, y0, x1, y1)
                    })
                    found = True
                    break
                    
        # 3. Last fallback: Estimate coordinates based on product layout order on the page
        if not found:
            page_height = page.rect.height
            page_width = page.rect.width
            # products per page on page P
            prods_on_this_page = [p2 for idx2, p2 in enumerate(products) if get_product_page(name, idx2 + 1) == expected_page]
            num_prods = len(prods_on_this_page)
            # Find index of current product within this page
            inner_idx = 0
            for idx2, p2 in enumerate(products):
                if get_product_page(name, idx2 + 1) == expected_page:
                    if idx2 == idx:
                        break
                    inner_idx += 1
                    
            # Distribute y coordinate uniformly
            y_center = page_height * (0.2 + 0.6 * (inner_idx / max(1, num_prods - 1)))
            center = (page_width / 2, y_center)
            located_products.append({
                "id": prod_id,
                "name": prod_name,
                "page": expected_page,
                "center": center,
                "text_bbox": (0, y_center - 20, page_width, y_center + 20)
            })
            print(f"  Warning: Used layout fallback for {prod_id}: {prod_name} on page {expected_page+1}")

    # Group located products by page
    products_by_page = {}
    for lp in located_products:
        p_idx = lp["page"]
        if p_idx not in products_by_page:
            products_by_page[p_idx] = []
        products_by_page[p_idx].append(lp)
        
    # Crop and match page by page
    for p_idx in sorted(products_by_page.keys()):
        page = doc[p_idx]
        page_prods = products_by_page[p_idx]
        
        # Collect candidate images on this page
        images_info = page.get_image_info()
        candidate_images = []
        for i, img in enumerate(images_info):
            bbox = img["bbox"]
            w_pts = bbox[2] - bbox[0]
            h_pts = bbox[3] - bbox[1]
            w_px = img["width"]
            h_px = img["height"]
            
            # Filter backgrounds (too large)
            if w_pts > 500 or h_pts > 500:
                continue
            # Exclude headers in Navidad (968x254)
            if w_px == 968 and h_px == 254:
                continue
            # Exclude frames in Navidad (461x600)
            if w_px == 461 and h_px == 600:
                continue
            # Exclude stamps in Navidad (324x324)
            if w_px == 324 and h_px == 324:
                continue
            # Exclude tiny icons
            if w_pts < 20 or h_pts < 20:
                continue
                
            center = ((bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2)
            candidate_images.append((i, center, bbox))
            
        print(f"  Page {p_idx+1}: {len(page_prods)} products, {len(candidate_images)} candidate images")
        
        # Match products and images
        prods_to_match = [(lp["id"], lp["center"]) for lp in page_prods]
        matching = find_best_matching(prods_to_match, candidate_images)
        
        # Render page at 300 DPI for high quality crops
        zoom = 300 / 72
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat)
        page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        
        for prod_id, match in matching.items():
            if not match:
                print(f"    Product {prod_id} has no matching image!")
                continue
            
            img_idx, _, bbox = match
            left = max(0, int(bbox[0] * zoom))
            top = max(0, int(bbox[1] * zoom))
            right = min(page_img.width, int(bbox[2] * zoom))
            bottom = min(page_img.height, int(bbox[3] * zoom))
            
            cropped = page_img.crop((left, top, right, bottom))
            out_file = f"{prod_id}.png"
            out_path = os.path.join(output_dir, out_file)
            cropped.save(out_path)
            
            results[prod_id] = {
                "file": out_file,
                "width": cropped.width,
                "height": cropped.height
            }

print(f"\nSuccessfully extracted {len(results)} high-resolution product images.")
