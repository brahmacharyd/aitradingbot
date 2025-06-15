import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingviewChartComponent } from './tradingview-chart.component';

describe('TradingviewChartComponent', () => {
  let component: TradingviewChartComponent;
  let fixture: ComponentFixture<TradingviewChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TradingviewChartComponent]
    });
    fixture = TestBed.createComponent(TradingviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
