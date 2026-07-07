import styles from './CompletionScreen.module.css';
import { Button } from '../components/Button';

interface ConfettiSpec {
  size: number;
  round: boolean;
  color: string;
  tx: number;
  ty: number;
  rot: number;
}

const CONFETTI: ConfettiSpec[] = [
  { size: 12, round: false, color: '#FF7A5C', tx: -170, ty: 70, rot: 220 },
  { size: 11, round: true, color: '#4FB6D6', tx: 150, ty: 60, rot: -180 },
  { size: 13, round: false, color: '#5FBF8E', tx: -110, ty: 120, rot: 160 },
  { size: 11, round: false, color: '#F5A623', tx: 120, ty: 128, rot: -140 },
  { size: 10, round: true, color: '#FF7A5C', tx: -200, ty: 150, rot: 200 },
  { size: 12, round: false, color: '#4FB6D6', tx: 190, ty: 158, rot: -220 },
  { size: 10, round: true, color: '#F5A623', tx: -56, ty: 88, rot: 120 },
  { size: 10, round: false, color: '#5FBF8E', tx: 66, ty: 92, rot: -120 },
];

interface CompletionScreenProps {
  onDone: () => void;
}

export function CompletionScreen({ onDone }: CompletionScreenProps) {
  return (
    <div className={styles.page}>
      <div className={styles.stage}>
        <div className={styles.confettiOrigin}>
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className={styles.confettiPiece}
              style={
                {
                  width: c.size,
                  height: c.size,
                  background: c.color,
                  borderRadius: c.round ? '50%' : 2,
                  '--tx': `${c.tx}px`,
                  '--ty': `${c.ty}px`,
                  '--rot': `${c.rot}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <svg viewBox="0 0 220 150" className={styles.mugs}>
          <g className={styles.mugL}>
            <rect x="52" y="54" width="46" height="62" rx="9" fill="#F5A623" stroke="#2C2A26" strokeWidth="4" />
            <rect x="59" y="68" width="20" height="9" rx="4" fill="#FFD07A" />
            <path d="M52 70 h-11 a12 12 0 0 0 0 24 h11" fill="none" stroke="#2C2A26" strokeWidth="4" />
            <path
              d="M48 59 q-3 -17 11 -19 q5 -12 16 -7 q11 -5 16 7 q14 2 11 19 z"
              fill="#FFF6E6"
              stroke="#2C2A26"
              strokeWidth="4"
            />
          </g>
          <g className={styles.mugR}>
            <rect x="122" y="54" width="46" height="62" rx="9" fill="#FFB84D" stroke="#2C2A26" strokeWidth="4" />
            <rect x="141" y="68" width="20" height="9" rx="4" fill="#FFE0A0" />
            <path d="M168 70 h11 a12 12 0 0 1 0 24 h-11" fill="none" stroke="#2C2A26" strokeWidth="4" />
            <path
              d="M172 59 q3 -17 -11 -19 q-5 -12 -16 -7 q-11 -5 -16 7 q-14 2 -11 19 z"
              fill="#FFF6E6"
              stroke="#2C2A26"
              strokeWidth="4"
            />
          </g>
        </svg>
      </div>

      <div className={styles.cheers}>Cheers!</div>
      <p className={styles.blurb}>You showed up for yourself tonight. That's the practice.</p>
      <div className={styles.doneButton}>
        <Button variant="primary" onClick={onDone}>
          Done
        </Button>
      </div>
    </div>
  );
}
