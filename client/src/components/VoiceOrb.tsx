import type { PropsWithChildren } from "react";
import styles from "./VoiceOrb.module.css";
import { FrenchieFace } from "./FrenchieFace";

type VoiceOrbStatus = "idle" | "listening" | "processing" | "success" | "error";

interface VoiceOrbProps extends PropsWithChildren {
  status: VoiceOrbStatus;
  onStart?: () => void;
  onStop?: () => void;
  onCancel?: () => void;
  label?: string;
  className?: string;
}

const statusLabel: Record<VoiceOrbStatus, string> = {
  idle: "Ready to listen",
  listening: "Listening…",
  processing: "Processing…",
  success: "Captured",
  error: "Try again",
};

const actionHint: Record<VoiceOrbStatus, string> = {
  idle: "Tap to start",
  listening: "Tap to stop",
  processing: "Tap to cancel",
  success: "Tap to start another",
  error: "Tap to retry",
};

export function VoiceOrb({
  status,
  onStart,
  onStop,
  onCancel,
  label,
  className,
}: VoiceOrbProps) {
  const handlePress = () => {
    if (status === "idle" || status === "success" || status === "error") {
      onStart?.();
    } else if (status === "listening") {
      onStop?.();
    } else if (status === "processing") {
      onCancel?.();
    }
  };

  const ariaLabel = label ?? `${statusLabel[status]} — ${actionHint[status]}`;

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <button
        type="button"
        className={`${styles.orbButton} ${styles[status]} ${
          status === "success" ? styles.successBounce : ""
        }`}
        onClick={handlePress}
        aria-label={ariaLabel}
        aria-live="polite"
      >
        {/* Orb visual layers */}
        <span className={styles.ring} aria-hidden />
        <span className={styles.core} aria-hidden />

        {/* Processing spinner */}
        {status === "processing" && (
          <span className={styles.spinner} aria-hidden />
        )}

        {/* Success flash */}
        {status === "success" && (
          <span className={styles.flash} aria-hidden />
        )}

        {/* Error glow */}
        {status === "error" && (
          <span className={styles.errorGlow} aria-hidden />
        )}

        {/* Listening waveform */}
        {status === "listening" && (
          <span className={styles.waveform} aria-hidden>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </span>
        )}

        {/* 🐶 Frenchie success overlay */}
        <FrenchieFace visible={status === "success"} />
      </button>

      <div className={styles.caption} aria-live="polite">
        <div className={styles.statusLabel}>{statusLabel[status]}</div>
        <div className={styles.hint}>{actionHint[status]}</div>
      </div>
    </div>
  );
}

export type { VoiceOrbProps, VoiceOrbStatus };
export default VoiceOrb;
