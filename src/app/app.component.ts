import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import exportFromJSON from 'export-from-json';
import { GetStocksService } from './get-stocks.service';
import { Stock, StockValues } from './models/stock/stock.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  AfterViewInit {
  
  stocks: Stock[] = [];
  stockValues: StockValues[] = [];
  // stk: Stock[] =
  // [
  //   {
  //     "id": 1,
  //     "stock": "AAPL",
  //     "industry": "Technology",
  //     "sector": "Information Technology",
  //     "currency_code": "USD"
  //   },
  //   {
  //     "id": 2,
  //     "stock": "AMZN",
  //     "industry": "Retail",
  //     "sector": "Consumer Discretionary",
  //     "currency_code": "USD"
  //   },
  //   {
  //     "id": 3,
  //     "stock": "GOOGL",
  //     "industry": "Technology",
  //     "sector": "Information Technology",
  //     "currency_code": "USD"
  //   }
  // ];  
  
  displayedColumns: string[] = [
    
    'stock',
    'sector',
    'industry',
    'currency_code'
  ];
  stockDisplayedColumns: string[] = [
    
    'stock_id',
    'date',
    'value',
  ];

  

  

  

  constructor(private stocksService: GetStocksService, private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.stockValuesDataSource.sort = this.sort;
  }
  dataSource = new MatTableDataSource(this.stocks);
  stockValuesDataSource = new MatTableDataSource(this.stockValues);

  ngOnInit() {
    this.getStocks();
  }


  
  

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  
  



  filterStocks(event: any) {
    //console.log(event.target.value);
    const query = event.target.value.toLowerCase();
    const filteredStocks = this.stocks.filter(stock => {
      return stock.stock.toLowerCase().includes(query) ||
             stock.industry.toLowerCase().includes(query) ||
             stock.sector.toLowerCase().includes(query)||
             stock.currency_code.toLowerCase().includes(query);
    });
    if(query==""){
      this.getStocks();
    }
    else
      this.stocks = filteredStocks;
  }

  getStocks(){
    this.stocksService.getStocks().subscribe(data => {
      this.stocks = data;
      //console.log("from api"+data[0].currency_code);
      this.dataSource = new MatTableDataSource(this.stocks);
    });
  }

  fetchStockValues(event:any){
    this.stocksService.getStockValues(event.id).subscribe(data => { 
      //console.log("chaita");
      this.stockValues = data;
      this.stockValuesDataSource = new MatTableDataSource(this.stockValues);
    });
  }

  onClick() {
    console.log('clicked');

    const data = this.stockValues;
    const fileName = 'download'
    const exportType = 'json'

    exportFromJSON({ data, fileName, exportType })
  }

}
