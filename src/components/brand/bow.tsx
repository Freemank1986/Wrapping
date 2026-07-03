/**
 * Shared bow mark, reused by the logo, hero illustration, and page-transition
 * overlay. `id` must be unique per render site since SVG gradients are
 * referenced by id and this component can appear more than once per page.
 */
export function BowPaths({ id, flat }: { id: string; flat?: string }) {
  const fill = flat ?? `url(#${id})`;

  return (
    <>
      {!flat && (
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f2dd9c" />
            <stop offset="45%" stopColor="#cda233" />
            <stop offset="100%" stopColor="#9c7a1a" />
          </linearGradient>
        </defs>
      )}
      <g fill={fill}>
        {/* tails, notched swallowtail ends */}
        <path d="M29.5 24 L21 40 L26 40 L29 30 L32 30 L29.5 24 Z" />
        <path d="M34.5 24 L43 40 L38 40 L35 30 L32 30 L34.5 24 Z" />
        {/* left loop */}
        <path d="M30.5 22.5 C24 14 10 13 7 19.5 C4.5 24.5 8.5 30 16 28.5 C21 27.5 27 25 30.5 22.5 Z" />
        {/* right loop */}
        <path d="M33.5 22.5 C40 14 54 13 57 19.5 C59.5 24.5 55.5 30 48 28.5 C43 27.5 37 25 33.5 22.5 Z" />
        {/* center knot */}
        <path d="M28.5 20 C28.5 17 30 15.5 32 15.5 C34 15.5 35.5 17 35.5 20 C35.5 23.5 33.5 25.5 32 26.5 C30.5 25.5 28.5 23.5 28.5 20 Z" />
      </g>
      {!flat && (
        <ellipse cx="30" cy="18.5" rx="1.4" ry="2" fill="#fdf3d0" opacity="0.65" />
      )}
    </>
  );
}
