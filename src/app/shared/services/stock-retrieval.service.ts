import { Injectable } from '@angular/core';

const STOCK_KEY = "stocks";

@Injectable({
  providedIn: 'root'
})
export class StockRetrievalService {

  constructor() { }


  public retrieveAllStocksFromUser(): string[] {
    return JSON.parse(localStorage.getItem(STOCK_KEY));
  }


  public addStock(stock: string): void {
    localStorage.setItem(
      STOCK_KEY, JSON.stringify([stock, ...this.retrieveAllStocksFromUser()])
    );
  }

  public removeStock(stock: string): void {
    localStorage.setItem(
      STOCK_KEY, JSON.stringify(this.retrieveAllStocksFromUser().filter(st => st != stock))
    );
  }
}
