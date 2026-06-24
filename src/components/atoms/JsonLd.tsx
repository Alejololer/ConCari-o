// Renders a JSON-LD <script> for structured data (SEO / AI crawlers).
// Atom: no business logic — caller passes the schema object.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape '<' so an owner-entered "</script>" in a product name can't break out.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
