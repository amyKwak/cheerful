import type { AppData, WeekList } from './types';

const STORAGE_KEY = 'cheerful.app-data.v1';

function defaultData(): AppData {
  return {
    userName: '',
    lists: {},
    reflectedNights: {},
  };
}

export function loadData(): AppData {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultData();
  try {
    return { ...defaultData(), ...JSON.parse(raw) };
  } catch {
    return defaultData();
  }
}

export function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveList(data: AppData, list: WeekList): AppData {
  const next: AppData = { ...data, lists: { ...data.lists, [list.weekStart]: list } };
  saveData(next);
  return next;
}

export function saveUserName(data: AppData, userName: string): AppData {
  const next: AppData = { ...data, userName };
  saveData(next);
  return next;
}

export function markNightReflected(data: AppData, weekStart: string, nightISO: string): AppData {
  const existing = data.reflectedNights[weekStart] ?? [];
  if (existing.includes(nightISO)) return data;
  const next: AppData = {
    ...data,
    reflectedNights: { ...data.reflectedNights, [weekStart]: [...existing, nightISO] },
  };
  saveData(next);
  return next;
}
