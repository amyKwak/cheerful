import type { ButtonHTMLAttributes } from 'react';
import { colors } from '../theme';

type Variant = 'primary' | 'dark' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const base: React.CSSProperties = {
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 800,
  border: 'none',
  borderRadius: 15,
  cursor: 'pointer',
  fontSize: 16,
};

const variants: Record<Variant, React.CSSProperties> = {
  primary: {
    color: colors.ink,
    background: colors.amber,
    boxShadow: `0 5px 0 ${colors.amberDeep}`,
    padding: '14px 30px',
  },
  dark: {
    color: colors.cream,
    background: colors.ink,
    padding: '14px 26px',
  },
  ghost: {
    color: colors.amberText,
    background: 'transparent',
    fontSize: 14,
    padding: '6px 4px',
  },
};

export function Button({ variant = 'primary', fullWidth, style, disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      {...rest}
      style={{
        ...base,
        ...variants[variant],
        width: fullWidth ? '100%' : undefined,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'default' : 'pointer',
        ...style,
      }}
    />
  );
}
