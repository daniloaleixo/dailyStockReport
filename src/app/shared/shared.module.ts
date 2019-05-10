import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphaAdvantageService } from './services/alpha-advantage.service';
import { StockRetrievalService } from './services/stock-retrieval.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AlphaAdvantageService,
    StockRetrievalService
  ]
})
export class SharedModule { }
