/**
 * Central Pricing Utility for HighTrip Holidays
 * Toggle SHOW_PRICES to control whether numerical prices are displayed
 * or replaced with luxury "Price On Request" / "Curated Rates" badges.
 */

export const SHOW_PRICES = false;

export function formatPriceDisplay(
  priceInr?: number,
  options: {
    fallbackText?: string;
    prefix?: string;
    suffix?: string;
  } = {}
): string {
  const { fallbackText = 'Price On Request', prefix = 'Starting from ', suffix = '' } = options;

  if (!SHOW_PRICES || typeof priceInr !== 'number' || isNaN(priceInr)) {
    return fallbackText;
  }

  return `${prefix}₹${priceInr.toLocaleString('en-IN')}${suffix}`;
}
