/** Shared bow paths, reused by the logo mark, hero illustration, and page-transition overlay. */
export function BowPaths({ color = "#c9a227" }: { color?: string }) {
  return (
    <g fill={color}>
      <path d="M31 23 L24 37 L29 35 L31 29 Z" />
      <path d="M33 23 L40 37 L35 35 L33 29 Z" />
      <path d="M31 22 C24 13 12 14 9 20 C7 24 11 29 18 27 C23.5 25.5 29 24.5 31 22 Z" />
      <path d="M33 22 C40 13 52 14 55 20 C57 24 53 29 46 27 C40.5 25.5 35 24.5 33 22 Z" />
      <circle cx="32" cy="22.5" r="4.5" />
    </g>
  );
}
