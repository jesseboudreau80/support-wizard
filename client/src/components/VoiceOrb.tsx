import type { PropsWithChildren } from 'react';
import styles from './VoiceOrb.module.css';

type VoiceOrbStatus = 'idle' | 'listening' | 'processing' | 'success' | 'error';

interface VoiceOrbProps extends PropsWithChildren {
  status: VoiceOrbStatus;
  onStart?: () => void;
  onStop?: () => void;
  onCancel?: () => void;
  label?: string;
  className?: string;
}

const statusLabel: Record<VoiceOrbStatus, string> = {
  idle: 'Ready to listen',
  listening: 'Listening…',
  processing: 'Processing…',
  success: 'Captured',
  error: 'Try again',
};

const actionHint: Record<VoiceOrbStatus, string> = {
  idle: 'Tap to start',
  listening: 'Tap to stop',
  processing: 'Tap to cancel',
  success: 'Tap to start another',
  error: 'Tap to retry',
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
    if (status === 'idle' || status === 'success' || status === 'error') {
      onStart?.();
    } else if (status === 'listening') {
      onStop?.();
    } else if (status === 'processing') {
      onCancel?.();
    }
  };

  const ariaLabel = label ?? `${statusLabel[status]} — ${actionHint[status]}`;

  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <button
        type="button"
        className={`${styles.orbButton} ${styles[status]}`}
        onClick={handlePress}
        aria-label={ariaLabel}
        aria-live="polite"
      >
        <span className={styles.ring} aria-hidden />
        <span className={styles.core} aria-hidden />
        {status === 'processing' && <span className={styles.spinner} aria-hidden />}
        {status === 'success' && <span className={styles.flash} aria-hidden />}
        {status === 'error' && <span className={styles.errorGlow} aria-hidden />}
        {status === 'listening' && (
          <span className={styles.waveform} aria-hidden>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </span>
        )}
      </button>

      <div className={styles.caption} aria-live="polite">
        <div className={styles.statusLabel}>{statusLabel[status]}</div>
        <div className={styles.hint}>{actionHint[status]}</div>
      </div>

      {/*
        Example usage:
        <VoiceOrb
          status="idle"
          onStart={() => console.log('start listening')}
          onStop={() => console.log('stop listening')}
          onCancel={() => console.log('cancel processing')}
        />
      */}
    </div>
  );
}

export type { VoiceOrbProps, VoiceOrbStatus };
export default VoiceOrb;
