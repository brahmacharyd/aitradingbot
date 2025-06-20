// local-storage.service.ts
import { Injectable } from '@angular/core';
import { Order } from './order.model';

const STORAGE_KEY = 'ai_orders';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getOrders(): Order[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveOrder(order: Order): void {
    const orders = this.getOrders();
    orders.unshift(order); // latest order on top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  clearOrders(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
