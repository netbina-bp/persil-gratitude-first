import { format } from "date-fns-jalali";

/**
 * Format an ISO date string as Shamsi date + time for display.
 */
export function formatPersianDateTime(isoDate: string | null): string {
  if (!isoDate) return "—";
  try {
    return format(new Date(isoDate), "yyyy/MM/dd HH:mm");
  } catch {
    return "—";
  }
}

/**
 * Return Shamsi date key (yyyy-MM-dd) for grouping. Sorts correctly as string.
 */
export function toPersianDateKey(isoDate: string | null): string {
  if (!isoDate) return "—";
  try {
    return format(new Date(isoDate), "yyyy-MM-dd");
  } catch {
    return "—";
  }
}

/**
 * Format an ISO date string as Shamsi date only (yyyy/MM/dd) for display.
 */
export function formatPersianDate(isoDate: string | null): string {
  if (!isoDate) return "—";
  try {
    return format(new Date(isoDate), "yyyy/MM/dd");
  } catch {
    return "—";
  }
}
