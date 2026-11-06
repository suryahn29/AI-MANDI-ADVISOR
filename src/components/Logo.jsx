/*
 * Raitha Mitra logo: a sprout growing from a rupee coin (crop + better earnings).
 * Same artwork as public/favicon.svg.
 */
function Logo({ size = 44, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Raitha Mitra logo"
      className={className}
    >
      <rect width="64" height="64" rx="16" fill="#14532d" />
      {/* coin */}
      <circle cx="32" cy="42" r="13" fill="#f59e0b" />
      <circle cx="32" cy="42" r="10" fill="none" stroke="#fde68a" strokeWidth="1.5" />
      {/* rupee sign */}
      <path
        d="M27 36.5h10M27 40h10M30 36.5c3.2 0 4.8 1.4 4.8 3.5s-1.6 3.5-4.8 3.5h-2l6.5 6"
        fill="none"
        stroke="#14532d"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* sprout stem */}
      <path d="M32 29V15" stroke="#86efac" strokeWidth="3" strokeLinecap="round" />
      {/* leaves */}
      <path d="M32 22c-1-6-6-9-12-9 0 6 5 10 12 9z" fill="#4ade80" />
      <path d="M32 18c1-5 5-8 11-8 0 6-4 9-11 8z" fill="#22c55e" />
    </svg>
  );
}

export default Logo;
