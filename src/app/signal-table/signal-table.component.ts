import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { ClassifiedSignal } from './classified-signal.model';
import { Order } from '../order.model';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-signal-table',
  templateUrl: './signal-table.component.html',
  styleUrls: ['./signal-table.component.css']
})
export class SignalTableComponent implements OnInit, OnDestroy {
  signals: ClassifiedSignal[] = [];
  groupedSignals: { [strategy: string]: ClassifiedSignal[] } = {};
  strategyTabs: string[] = [];
  activeTab: string = '';
  loading = true;
  private sub!: Subscription;

  constructor(private socketService: SocketService,private storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.sub = this.socketService.listenToClassifiedSignals().subscribe((classifiedSignals) => {
      console.log('📥 UI received classified signals:', classifiedSignals);
      this.signals = classifiedSignals;
      this.groupSignalsByStrategy();
      this.loading = false;
    });

    // Fallback: Hide loader after 10s even if no data
    setTimeout(() => {
      this.loading = false;
    }, 10000);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.socketService.disconnect();
  }

  groupSignalsByStrategy(): void {
    this.groupedSignals = {};
    for (const signal of this.signals) {
      const strategy = signal.strategy;
      if (!this.groupedSignals[strategy]) {
        this.groupedSignals[strategy] = [];
      }
      this.groupedSignals[strategy].push(signal);
    }
    this.strategyTabs = Object.keys(this.groupedSignals);
    this.activeTab = this.strategyTabs[0] || '';
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }
  onSignalConfirmed(signal: any): void {
    const order: Order = {
      symbol: signal.symbol,
      type: signal.type,
      price: signal.price,
      tp: signal.tp,
      sl: signal.sl,
      timestamp: new Date().toISOString(),
    };

    this.storageService.saveOrder(order);
    console.log('✅ Order saved to Local Storage', order);
  }
}
