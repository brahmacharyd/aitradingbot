import { Component, OnInit } from '@angular/core';
import { Order } from '../order.model';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-signal-history',
  templateUrl: './signal-history.component.html',
})
export class SignalHistoryComponent implements OnInit {
  orders: Order[] = [];

  constructor(private storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.orders = this.storageService.getOrders();
  }

  clearOrders(): void {
    this.storageService.clearOrders();
    this.orders = [];
  }
}
