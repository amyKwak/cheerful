export interface WeekList {
  /** ISO yyyy-mm-dd of the Sunday that starts this week */
  weekStart: string;
  items: string[];
}

export interface AppData {
  userName: string;
  lists: Record<string, WeekList>;
  /** weekStart -> ISO dates reflected that week */
  reflectedNights: Record<string, string[]>;
}
