import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes Indonesian phone/WhatsApp numbers to standard '08...' format
 * Examples:
 *   '+628123456789' -> '08123456789'
 *   '628123456789'  -> '08123456789'
 *   '0812-3456-789' -> '08123456789'
 */
export function normalizeWhatsApp(phone: string): string {
  // Strip non-digits except leading +
  let cleaned = phone.replace(/[^0-9+]/g, '');

  if (cleaned.startsWith('+62')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('62')) {
    cleaned = '0' + cleaned.slice(2);
  } else if (!cleaned.startsWith('0') && cleaned.length >= 9) {
    cleaned = '0' + cleaned;
  }

  return cleaned;
}

export function isValidIndonesianPhone(phone: string): boolean {
  const norm = normalizeWhatsApp(phone);
  // Indonesian mobile numbers usually start with 08 and are 10-14 digits long
  return /^08[1-9][0-9]{7,11}$/.test(norm);
}

/**
 * Format date in Indonesian WIB timezone (UTC+7)
 */
export function formatWIB(
  dateStrOrObj: string | Date,
  formatType: 'date' | 'datetime' | 'time' | 'short' = 'datetime'
): string {
  const date = typeof dateStrOrObj === 'string' ? new Date(dateStrOrObj) : dateStrOrObj;
  
  if (isNaN(date.getTime())) return '-';

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Jakarta',
  };

  if (formatType === 'time') {
    return date.toLocaleTimeString('id-ID', {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';
  }

  if (formatType === 'date') {
    return date.toLocaleDateString('id-ID', {
      ...options,
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  if (formatType === 'short') {
    return date.toLocaleDateString('id-ID', {
      ...options,
      day: 'numeric',
      month: 'short',
    });
  }

  return date.toLocaleDateString('id-ID', {
    ...options,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' WIB';
}
