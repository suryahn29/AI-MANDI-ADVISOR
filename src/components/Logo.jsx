/*
 * Raitha Mitra logo: a sprout over a farm field with crop rows and the sun.
 * Same artwork as public/favicon.svg.
 */
function Logo({ size = 44, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Raitha Mitra logo" className={className}>
      <defs>
        <clipPath id="rm-logo-clip">
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#fef3c7" />
      <g clipPath="url(#rm-logo-clip)">
        <circle cx="44" cy="22" r="8" fill="#f59e0b" />
        <path d="M-2 40 C14 33 50 33 66 40 V66 H-2 Z" fill="#15803d" />
        <path
          d="M32 38 L4 66 M32 38 L18 66 M32 38 L32 66 M32 38 L46 66 M32 38 L60 66"
          stroke="#86efac"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M-2 40 C14 33 50 33 66 40" fill="none" stroke="#14532d" strokeWidth="2" />
      </g>
      <path d="M22 35 V24" stroke="#14532d" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 28 c-1-5-5-7-9-7 0 5 4 8 9 7z" fill="#16a34a" />
      <path d="M22 26 c1-4 4-6 8-6 0 4-3 7-8 6z" fill="#22c55e" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#14532d" strokeWidth="3" />
    </svg>
  );
}

export default Logo;
