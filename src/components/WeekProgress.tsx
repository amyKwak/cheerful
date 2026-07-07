import { colors } from '../theme';
import { toISODate, reflectionNightsForWeek } from '../lib/dateUtils';

interface WeekProgressProps {
  weekStart: Date;
  reflectedISO: string[];
  today: Date;
}

export function WeekProgress({ weekStart, reflectedISO, today }: WeekProgressProps) {
  const nights = reflectionNightsForWeek(weekStart);
  const todayISO = toISODate(today);
  const doneCount = nights.filter((n) => reflectedISO.includes(toISODate(n))).length;
  const started = doneCount > 0;

  return (
    <div
      style={{
        background: '#FFF',
        border: started ? `2px solid ${colors.border}` : `2px dashed ${colors.borderStrong}`,
        borderRadius: 18,
        padding: '15px 18px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: 14, color: started ? colors.ink : colors.textFainter }}>
          This week
        </span>
        <span style={{ fontWeight: 700, fontSize: 13, color: colors.textFaint }}>
          {started ? `${doneCount} of ${nights.length} nights` : 'Not started'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
        {nights.map((n) => {
          const iso = toISODate(n);
          const isDone = reflectedISO.includes(iso);
          const isToday = iso === todayISO;
          const bg = isDone ? colors.green : isToday ? colors.amber : colors.amberPaleDeep;
          return <span key={iso} style={{ flex: 1, height: 9, borderRadius: 5, background: bg }} />;
        })}
      </div>
    </div>
  );
}
