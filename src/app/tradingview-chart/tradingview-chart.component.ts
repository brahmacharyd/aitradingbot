import { Component, AfterViewInit } from '@angular/core';

declare const TradingView: any;

@Component({
  selector: 'app-tradingview-chart',
  templateUrl: './tradingview-chart.component.html',
  styleUrls: ['./tradingview-chart.component.css']
})
export class TradingviewChartComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    new TradingView.widget({
      container_id: 'tv_chart_container',
      autosize: true,
      symbol: 'BINANCE:ETHUSD',
      interval: '15',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#1e293b',
      enable_publishing: false,
      allow_symbol_change: true,
      hide_side_toolbar: false,
      withdateranges: true,
      save_image: false,
      details: true,
      hotlist: true,
      calendar: true,
  
      studies: [
        'Moving Average Exponential@tv-basicstudies',
        'Moving Average Exponential@tv-basicstudies',
      ],
  
      overrides: {
        // EMA 1 (length 3)
        'standoff_0.length': 3,
        'standoff_0.color': '#facc15',
        // EMA 2 (length 9)
        'standoff_1.length': 9,
        'standoff_1.color': '#10b981',
        // EMA 3 (length 15)
        'standoff_2.length': 15,
        'standoff_2.color': '#6366f1',
        // EMA 4 (length 50)
        'standoff_3.length': 50,
        'standoff_3.color': '#ef4444'
      }
    });
  }
  
}
