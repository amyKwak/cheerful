const DAY_NAMES = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Most recent Sunday (or today, if today is Sunday), midnight local time. */
export function getWeekStart(date: Date): Date {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  start.setDate(start.getDate() - start.getDay());
  return start;
}

export function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

export function dayName(date: Date): string {
  return DAY_NAMES[date.getDay()];
}

/** Reflection nights run Monday-Saturday; Sunday is the list-writing day. */
export function isReflectionNight(date: Date): boolean {
  return date.getDay() !== 0;
}

export function nightsLeftThisWeek(date: Date): number {
  // Nights remaining including today, through Saturday.
  return date.getDay() === 0 ? 6 : 6 - (date.getDay() - 1);
}

/** The 6 reflection-night dates (Mon-Sat) for the week starting on weekStart (a Sunday). */
export function reflectionNightsForWeek(weekStart: Date): Date[] {
  const nights: Date[] = [];
  for (let i = 1; i <= 6; i++) {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    nights.push(d);
  }
  return nights;
}
