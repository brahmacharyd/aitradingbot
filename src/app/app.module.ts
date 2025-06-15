import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalTableComponent } from './signal-table/signal-table.component';
import { TradingviewChartComponent } from './tradingview-chart/tradingview-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    // AiSignalChartComponent,
    SignalTableComponent,
    TradingviewChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
