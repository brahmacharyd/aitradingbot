// order.model.ts
export interface Order {
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  tp: number;
  sl: number;
  timestamp: string;
  [key: string]: any; // for additional metadata
}
