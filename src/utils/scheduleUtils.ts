import type { ScheduleSlot } from '../types/schedule';

/**
 * Extracts the subject string for a particular day from a slot.
 * Supports:
 * 1. Exact day name: slot["Monday"] or slot["Thứ 2"]
 * 2. Day index in array: slot.subjects[dayIndex]
 * 3. Short day key: slot["Mon"], slot["Tue"]
 * 4. Numeric key: slot["0"], slot["1"]
 */
export function getSlotSubject(slot: ScheduleSlot, dayName: string, dayIndex: number): string {
  if (!slot) return '';

  // 1. Array index
  if (Array.isArray(slot.subjects) && slot.subjects[dayIndex] !== undefined) {
    return String(slot.subjects[dayIndex] || '');
  }

  // 2. Direct match by dayName (e.g. "Monday", "Thứ 2")
  if (slot[dayName] !== undefined) {
    return String(slot[dayName] || '');
  }

  // 3. Case-insensitive or normalized check
  const lowerDay = dayName.toLowerCase().trim();
  for (const key of Object.keys(slot)) {
    if (key.toLowerCase().trim() === lowerDay) {
      return String(slot[key] || '');
    }
  }

  // 4. Common English 3-letter abbreviations (e.g., "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
  const short3 = dayName.slice(0, 3).toLowerCase();
  for (const key of Object.keys(slot)) {
    if (key.toLowerCase().startsWith(short3)) {
      return String(slot[key] || '');
    }
  }

  // 5. Index key (e.g. "0", "1")
  if (slot[String(dayIndex)] !== undefined) {
    return String(slot[String(dayIndex)] || '');
  }

  return '';
}
