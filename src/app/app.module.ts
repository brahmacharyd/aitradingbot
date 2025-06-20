import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalTableComponent } from './signal-table/signal-table.component';
import { TradingviewChartComponent } from './tradingview-chart/tradingview-chart.component';
import { SignalHistoryComponent } from './signal-history/signal-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalTableComponent,
    TradingviewChartComponent,
    SignalHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
