export type CurrencyCode = 
  | 'USD' 
  | 'EUR' 
  | 'GBP' 
  | 'JPY' 
  | 'AUD' 
  | 'CAD' 
  | 'CHF' 
  | 'CNY' 
  | 'HKD' 
  | 'NZD';

interface CurrencyInfo {
  symbol: string;
  position: 'before' | 'after';
}

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyInfo> = {
  USD: { symbol: '$', position: 'before' },
  EUR: { symbol: '€', position: 'after' },
  GBP: { symbol: '£', position: 'before' },
  JPY: { symbol: '¥', position: 'before' },
  AUD: { symbol: 'A$', position: 'before' },
  CAD: { symbol: 'C$', position: 'before' },
  CHF: { symbol: 'CHF', position: 'before' },
  CNY: { symbol: '¥', position: 'before' },
  HKD: { symbol: 'HK$', position: 'before' },
  NZD: { symbol: 'NZ$', position: 'before' }
};

export const formatCurrency = (amount: number, currency: CurrencyCode): string => {
  const info = CURRENCY_MAP[currency];
  const formattedAmount = amount.toFixed(2);
  
  return info.position === 'before' 
    ? `${info.symbol}${formattedAmount}`
    : `${formattedAmount}${info.symbol}`;
}; 