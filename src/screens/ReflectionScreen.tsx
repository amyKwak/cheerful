import { useEffect, useState } from 'react';
import styles from './ReflectionScreen.module.css';

interface ReflectionScreenProps {
  items: string[];
  onComplete: () => void;
  onExit: () => void;
}

export function ReflectionScreen({ items, onComplete, onExit }: ReflectionScreenProps) {
  const [index, setIndex] = useState(0);

  function advance() {
    if (index === items.length - 1) {
      onComplete();
    } else {
      setIndex((i) => Math.min(i + 1, items.length - 1));
    }
  }

  function back() {
    setIndex((i) => Math.max(i - 1, 0));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') advance();
      else if (e.key === 'ArrowLeft') back();
      else if (e.key === 'Escape') onExit();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items]);

  return (
    <div className={styles.page} onClick={advance}>
      <div className={styles.glow} />
      <div className={styles.counter}>
        {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </div>
      <button
        className={styles.close}
        onClick={(e) => {
          e.stopPropagation();
          onExit();
        }}
        aria-label="Exit reflection"
      >
        ✕
      </button>
      <div className={styles.emoji}>🌙</div>
      <div className={styles.text}>{items[index]}</div>
      <div className={styles.dots}>
        {items.map((_, i) => (
          <span key={i} className={[styles.dot, i === index ? styles.active : ''].join(' ')} />
        ))}
      </div>
      <div className={styles.hint}>← → arrow keys, or click to continue</div>
    </div>
  );
}
