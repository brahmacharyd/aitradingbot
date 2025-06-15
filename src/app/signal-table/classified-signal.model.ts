export interface ClassifiedSignal {
    symbol: string;
    strategy: string;
    type: 'BULLISH' | 'BEARISH';
    price: number;
    tp: number;
    sl: number;
    confidence: number;
    rrr: number;
    decision?: 'HIGH PROBABILITY LONG' | 'HIGH PROBABILITY SHORT' | 'WAIT FOR BREAKOUT' | 'CONFLICT ZONE';
  }
  
  
  export interface ClassifiedSignalPair {
    bullish: ClassifiedSignal;
    bearish: ClassifiedSignal;
    decision: 'HIGH PROBABILITY LONG' | 'HIGH PROBABILITY SHORT' | 'WAIT FOR BREAKOUT' | 'CONFLICT ZONE';
  }
  