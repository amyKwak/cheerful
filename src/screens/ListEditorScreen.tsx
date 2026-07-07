import { useState } from 'react';
import styles from './ListEditorScreen.module.css';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { isSunday } from '../lib/dateUtils';

interface ListEditorScreenProps {
  today: Date;
  initialItems: string[];
  lastWeekItems: string[] | undefined;
  onSave: (items: string[]) => void;
}

function normalize(items: string[]): string[] {
  const padded = [...items, '', '', '', '', ''].slice(0, 5);
  return padded;
}

export function ListEditorScreen({ today, initialItems, lastWeekItems, onSave }: ListEditorScreenProps) {
  const [items, setItems] = useState<string[]>(() => normalize(initialItems));
  const filledCount = items.filter((item) => item.trim().length > 0).length;
  const sunday = isSunday(today);

  function updateItem(index: number, value: string) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function carryOver() {
    if (lastWeekItems) setItems(normalize(lastWeekItems));
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Logo markSize={32} textSize={22} />
        <span className={styles.filledCount}>{filledCount} of 5 filled</span>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Your week</h2>
            {sunday && <span className={styles.pill}>☀️ It's Sunday</span>}
          </div>
          <p className={styles.subtitle}>The 5 things you're most grateful for this week.</p>

          <div className={styles.grid}>
            {items.map((value, index) => {
              const empty = value.trim().length === 0;
              const spanTwo = index === 4;
              return (
                <div
                  key={index}
                  className={[styles.item, empty ? styles.empty : '', spanTwo ? styles.itemSpan2 : ''].join(' ')}
                >
                  <span className={[styles.badge, empty ? styles.empty : ''].join(' ')}>{index + 1}</span>
                  <input
                    className={styles.itemInput}
                    value={value}
                    placeholder="Something you're grateful for…"
                    onChange={(e) => updateItem(index, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

          <div className={styles.footer}>
            {lastWeekItems && (
              <Button variant="ghost" onClick={carryOver}>
                ↩ Carry over last week
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => onSave(items)}
              disabled={filledCount < 5}
              style={{ marginLeft: 'auto' }}
            >
              Save list
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
