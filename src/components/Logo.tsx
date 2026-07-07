import { colors } from '../theme';

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 130 104" style={{ width: size, overflow: 'visible', flex: 'none' }}>
      <g transform="rotate(-14 41 62)">
        <rect x="22" y="36" width="38" height="52" rx="8" fill={colors.amber} stroke={colors.ink} strokeWidth="4" />
        <path d="M22 50 h-9 a10 10 0 0 0 0 20 h9" fill="none" stroke={colors.ink} strokeWidth="4" />
        <path
          d="M18 40 q-3 -14 9 -16 q4 -10 14 -6 q10 -4 14 6 q12 2 9 16 z"
          fill="#FFF6E6"
          stroke={colors.ink}
          strokeWidth="4"
        />
      </g>
      <g transform="rotate(14 89 62)">
        <rect x="70" y="36" width="38" height="52" rx="8" fill={colors.amberLight} stroke={colors.ink} strokeWidth="4" />
        <path d="M108 50 h9 a10 10 0 0 1 0 20 h-9" fill="none" stroke={colors.ink} strokeWidth="4" />
        <path
          d="M112 40 q3 -14 -9 -16 q-4 -10 -14 -6 q-10 -4 -14 6 q-12 2 -9 16 z"
          fill="#FFF6E6"
          stroke={colors.ink}
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}

export function Logo({ markSize = 32, textSize = 22 }: { markSize?: number; textSize?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <LogoMark size={markSize} />
      <span style={{ fontFamily: 'Baloo 2, cursive', fontWeight: 800, fontSize: textSize, letterSpacing: '-0.02em' }}>
        Cheerful
      </span>
    </div>
  );
}
