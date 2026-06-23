// Money formatting. No imports → safe to run under `node --experimental-strip-types`.
export function money(n: number): string {
  return "$" + n.toFixed(2);
}
