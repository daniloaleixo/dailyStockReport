
export interface IAlphaAdvantageResponse {
  'Meta Data': IAlphaAdvantageMetaData;
  'Time Series (5min)': {
    [date: string]: IAlphaAdvantageSingleTimeSerie;
  };
}

export interface IAlphaAdvantageMetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Interval': string;
  '5. Output Size': string;
  '6. Time Zone': string;
}

export interface IAlphaAdvantageSingleTimeSerie {
  '1. open': number;
  '2. high': number;
  '3. low': number;
  '4. close': number;
  '5. volume': number;
}
