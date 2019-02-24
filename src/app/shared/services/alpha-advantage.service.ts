import { Injectable } from '@angular/core';
import { HttpCommunicationService } from 'src/app/core/services/http-communication.service';
import { environment } from 'src/environments/environment';
import { IAlphaAdvantageResponse } from '../models/alpha-advantage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlphaAdvantageService {

  private alphaAdvantageHost = 'https://www.alphavantage.co/';

  constructor(private http: HttpCommunicationService) { }

  public getStockTimeSeries(stockCode: string): Observable<IAlphaAdvantageResponse> {
    return this.http.get<IAlphaAdvantageResponse>(
      `${this.alphaAdvantageHost}query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=5min&apikey=${environment.alphaAdvantageApiKey}`
    );
  }
}
