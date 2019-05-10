import { Component } from '@angular/core';
import { Sort } from '@angular/material';
import { forkJoin } from 'rxjs';
import { IAlphaAdvantageResponse, IAlphaAdvantageSingleTimeSerie } from './shared/models/alpha-advantage.model';
import { AlphaAdvantageService } from './shared/services/alpha-advantage.service';

interface IStockInfo {
  name: string;
  differencePercentage: number;
  topPercentage: number;
  bottomPercentage: number;
  currentPrice: number;
}

interface IAlphaAdvantageSingleTimeSerieWithTime extends IAlphaAdvantageSingleTimeSerie {
  time: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private stocks: string[] = ['ITSA4.SA', 'PETR4.SA'];
  private alphaResults: Array<IStockInfo> = [];

  public sortedData: IStockInfo[];
  // public addMode = false;
  public panelOpenState = true;



  constructor(private alpha: AlphaAdvantageService) {
    // this.getnfoFromStocks();
    this.alphaResults = [
      {
        name: "PETR4",
        differencePercentage: 0.5,
        topPercentage: 0.5,
        bottomPercentage: 0.5,
        currentPrice: 50.02,
      }
    ];
    this.sortedData = this.alphaResults.slice();
  }

  sortData(sort: Sort) {
    const data = this.alphaResults.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'differencePercentage': return compare(a.differencePercentage, b.differencePercentage, isAsc);
        case 'topPercentage': return compare(a.topPercentage, b.topPercentage, isAsc);
        case 'bottomPercentage': return compare(a.bottomPercentage, b.bottomPercentage, isAsc);
        case 'currentPrice': return compare(a.currentPrice, b.currentPrice, isAsc);
        default: return 0;
      }
    });
  }














  private getnfoFromStocks() {
    forkJoin(this.stocks.map(stock => this.alpha.getStockTimeSeries(stock)))
      .subscribe((results: IAlphaAdvantageResponse[]) => {
        this.alphaResults = results.map((result: IAlphaAdvantageResponse) => this.transformData(result));
        this.sortedData = this.alphaResults.slice();
      });
  }

  private transformData(response: IAlphaAdvantageResponse): IStockInfo {

    // Ordered from most recent
    const orderedTimeSeries: Array<IAlphaAdvantageSingleTimeSerieWithTime> = Object.keys(response["Time Series (5min)"])
      .map(time => {
        return {
          ...response["Time Series (5min)"][time],
          time,
        };
      })
      .sort((timeA, timeB) => new Date(timeB.time) > new Date(timeA.time) ? 1 : -1);

    const currentPrice: number = orderedTimeSeries[0]["1. open"];
    const startingPrice: number = this.getStartingPrice(orderedTimeSeries)["1. open"];


    return {
      name: response["Meta Data"]["2. Symbol"],
      currentPrice,
      differencePercentage: (currentPrice / startingPrice - 1) * 100,
      topPercentage: (orderedTimeSeries[0]["2. high"] / startingPrice - 1) * 100,
      bottomPercentage: (orderedTimeSeries[0]["3. low"] / startingPrice - 1) * 100,
    };
  }


  private getStartingPrice(list: Array<IAlphaAdvantageSingleTimeSerieWithTime>): IAlphaAdvantageSingleTimeSerieWithTime {
    let lastTime: string = list[0].time;

    for (let index = 1; index < list.length; index++) {

      const element: IAlphaAdvantageSingleTimeSerieWithTime = list[index];
      const lastDate: Date = new Date(lastTime);
      const newDate: Date = new Date(element.time);

      if (lastDate.getMonth() === newDate.getMonth() &&
        lastDate.getFullYear() === newDate.getFullYear() &&
        lastDate.getDate() !== newDate.getDate()) {
        return list[index - 1];
      } else {
        lastTime = element.time;
      }

    }

    return list[list.length - 1];
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
