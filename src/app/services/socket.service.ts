import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ClassifiedSignal, ClassifiedSignalPair } from '../signal-table/classified-signal.model';

export interface Signal {
  symbol: string;
  strategy: string;
  type: 'BULLISH' | 'BEARISH';
  price: number;
  tp: number;
  sl: number;
  confidence: number;
  rrr: number;
}
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private buffer: Signal[] = [];

  constructor() {
    this.socket = io('https://aitradingbot-backend.onrender.com/', {
      transports: ['websocket'],
      upgrade: false
    });

    this.socket.on('connect', () => {
      console.log('🟢 Connected to backend:', this.socket.id);
      this.socket.emit('request_signals');
    });

    this.socket.on('disconnect', () => {
      console.warn('🔌 Disconnected from backend');
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Connection Error:', error);
    });
  }

  listenToSignals(): Observable<ClassifiedSignal> {
    return new Observable(observer => {
      this.socket.on('signal', (data: ClassifiedSignal) => {
        observer.next(data);
      });
    });
  }
  listenToClassifiedSignals(): Observable<ClassifiedSignal[]> {
    return new Observable(observer => {
      this.socket.on('signal', (data: Signal) => {
        this.buffer.unshift(data);
  
        // keep only latest 100
        if (this.buffer.length > 100) this.buffer.pop();
  
        const classified = this.classifySignals(this.buffer);
        observer.next(classified); // ✅ this is now ClassifiedSignal[]
      });
    });
  }
  
  classifySignals(rawSignals: Signal[]): ClassifiedSignal[] {
    const grouped = new Map<string, { bullish?: Signal; bearish?: Signal }>();
  
    for (const signal of rawSignals) {
      const key = `${signal.symbol}_${signal.strategy}_${signal.price}`;
      const entry = grouped.get(key) || {};
      if (signal.type === 'BULLISH') entry.bullish = signal;
      else if (signal.type === 'BEARISH') entry.bearish = signal;
      grouped.set(key, entry);
    }
  
    const result: ClassifiedSignal[] = [];
  
    grouped.forEach(({ bullish, bearish }) => {
      if (bullish && bearish) {
        const gap = Math.abs(bullish.confidence - bearish.confidence);
        const bothStrong = bullish.confidence >= 70 && bearish.confidence >= 70;
  
        let decision: ClassifiedSignal['decision'] = 'WAIT FOR BREAKOUT';
        if (gap >= 5) {
          if (bullish.confidence > bearish.confidence && bullish.confidence >= 75) {
            decision = 'HIGH PROBABILITY LONG';
          } else if (bearish.confidence > bullish.confidence && bearish.confidence >= 75) {
            decision = 'HIGH PROBABILITY SHORT';
          }
        } else if (bothStrong) {
          decision = 'CONFLICT ZONE';
        }
  
        result.push({ ...bullish, decision });
        result.push({ ...bearish, decision });
      } else if (bullish) {
        const decision: ClassifiedSignal['decision'] =
          bullish.confidence >= 75 ? 'HIGH PROBABILITY LONG' : 'WAIT FOR BREAKOUT';
        result.push({ ...bullish, decision });
      } else if (bearish) {
        const decision: ClassifiedSignal['decision'] =
          bearish.confidence >= 75 ? 'HIGH PROBABILITY SHORT' : 'WAIT FOR BREAKOUT';
        result.push({ ...bearish, decision });
      }
    });
  
    return result;
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('🔕 Socket disconnected manually');
    }
  }
}
