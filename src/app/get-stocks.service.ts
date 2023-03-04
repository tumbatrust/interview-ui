import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock, StockValues } from './models/stock/stock.module';

@Injectable({
  providedIn: 'root'
})
export class GetStocksService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getStocks() {
    return this.http.get<Stock[]>(this.apiUrl+"/stocks");
  }

  getStockValues(id: number) {
    let obj = {"id":id}
    return this.http.post<StockValues[]>(this.apiUrl+"/values",obj)
  }
}
