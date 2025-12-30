export function FrenchieFace({ visible }: { visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.95)",
        transition: "opacity 300ms ease, transform 300ms ease",
        pointerEvents: "none",
      }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        {/* Head */}
        <circle cx="50" cy="55" r="28" fill="#1f2933" />

        {/* Ears */}
        <ellipse cx="28" cy="30" rx="10" ry="18" fill="#1f2933" />
        <ellipse cx="72" cy="30" rx="10" ry="18" fill="#1f2933" />

        {/* Eyes */}
        <circle cx="40" cy="55" r="4" fill="#fff" />
        <circle cx="60" cy="55" r="4" fill="#fff" />

        {/* Nose */}
        <ellipse cx="50" cy="65" rx="6" ry="4" fill="#111827" />
      </svg>
    </div>
  );
}
