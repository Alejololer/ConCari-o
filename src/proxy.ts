// Next 16 "proxy" (formerly middleware): refreshes the Supabase auth cookie on
// every request, does an optimistic redirect for /cms, and adds:
//   • IP-based rate-limiting on /login (anti-brute-force)
//   • Security headers on every response (anti-clickjacking, etc.)
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, hasSupabase } from "@/lib/supabase/env";

// ---------------------------------------------------------------------------
// In-memory sliding-window rate limiter (edge-compatible, no external deps).
// Vercel Edge Functions share memory within a single instance, so this is a
// best-effort guard — it blocks sustained burst attacks from the same IP.
// ---------------------------------------------------------------------------
interface Window {
  timestamps: number[];
}
const loginAttempts = new Map<string, Window>();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 8;            // max login POST attempts per IP per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = loginAttempts.get(ip) ?? { timestamps: [] };

  // Evict timestamps older than the window.
  window.timestamps = window.timestamps.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  window.timestamps.push(now);
  loginAttempts.set(ip, window);

  // Prune the map so it doesn't grow unbounded across long-lived instances.
  if (loginAttempts.size > 5_000) {
    const oldest = [...loginAttempts.entries()]
      .sort((a, b) => (a[1].timestamps.at(-1) ?? 0) - (b[1].timestamps.at(-1) ?? 0))
      .slice(0, 1_000)
      .map(([k]) => k);
    for (const key of oldest) loginAttempts.delete(key);
  }

  return window.timestamps.length > RATE_LIMIT_MAX;
}

// ---------------------------------------------------------------------------
// Security headers added to every outgoing response.
// ---------------------------------------------------------------------------
function addSecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  return res;
}

// ---------------------------------------------------------------------------
// Main proxy function.
// ---------------------------------------------------------------------------
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Rate-limit /login POST requests ---
  if (pathname === "/login" && request.method === "POST") {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      const blocked = new NextResponse(
        "Demasiados intentos. Espera un momento antes de volver a intentarlo.",
        {
          status: 429,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Retry-After": "60",
          },
        },
      );
      return addSecurityHeaders(blocked);
    }
  }

  if (!hasSupabase) return addSecurityHeaders(NextResponse.next());

  let response = NextResponse.next({ request });
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/cms")) {
    return addSecurityHeaders(
      NextResponse.redirect(new URL("/login", request.url)),
    );
  }

  return addSecurityHeaders(response);
}

export const config = {
  // Run on app routes, skip static assets & images.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo-concarino.svg).*)"],
};
