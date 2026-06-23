/**
 * Renders one or more JSON-LD <script> tags. Kept as a Server Component so
 * structured data is present in the initial HTML for crawlers.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const entries = Array.isArray(data) ? data : [data];
  return (
    <>
      {entries.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify output contains no user-controllable HTML when fed
          // structured data objects, so this is safe.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
