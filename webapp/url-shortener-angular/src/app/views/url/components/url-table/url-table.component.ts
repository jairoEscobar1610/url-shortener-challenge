import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Output, Input, EventEmitter, AfterViewInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UrlService } from '../../../../core/services/url/url.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MdbTableService, MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { Url } from '../../../../shared/models/url.model';

@Component({
  selector: 'app-url-table',
  templateUrl: './url-table.component.html',
  styleUrls: ['./url-table.component.scss']
})
export class UrlTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbPagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  @Input()
  elements: Array<Url> = new Array<Url>();

  @Output()
  removeElement = new EventEmitter<Url>();

  previous:Array<Url> = new Array<Url>();
  headElements = ["url",
  "shorten",
  "visit count",
  "remove url"];

  firstItemIndex;
  lastItemIndex;
  searchText="";
  currentPage = 1;
  pages = 0;
  elemsPerPage = 10;


  //Error label handling
  private urlDeleteErrorMsg: string;
  private urlListErrorMsg:string;

  constructor(private tableService: MdbTableService,
    private cdRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private urlService: UrlService,
    private modalDialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public ngOnChanges(): void {
     //Update datatable data
     this.tableService.setDataSource(this.elements);
     this.elements = this.tableService.getDataSource();
     this.previous = this.tableService.getDataSource();

     this.mdbPagination.setMaxVisibleItemsNumberTo(this.elemsPerPage);
     this.firstItemIndex = this.mdbPagination.firstItemIndex;
     this.lastItemIndex = this.mdbPagination.lastItemIndex;

     this.mdbPagination.calculateFirstItemIndex();
     this.mdbPagination.calculateLastItemIndex();
     this.mdbPagination.hideDescription = true;
     this.cdRef.detectChanges();
  }

  /**
   * Add 1 to visit count (locally)
   */
  onLinkClick(visitedUrl:Url){
    visitedUrl.visitCount ++;
  }

  addNewRow() {
    // tslint:disable-next-line:max-line-length
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
   
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.tableService.removeLastRow();
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  removeRow() {
    this.tableService.removeRow(1);
    this.tableService.getDataSource().forEach((el, index) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.tableService.rowRemoved().subscribe((data) => {
      console.log(data);
    });
  }

  emitDataSourceChange() {
    this.tableService.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }



  searchItems() {
    const prev = this.tableService.getDataSource();

    if (!this.searchText) {
      this.tableService.setDataSource(this.previous);
      this.elements = this.tableService.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.tableService.getDataSource().filter( (obj) => {
        return Object.keys(obj).some((key) => {
            return (obj[key])?(obj[key].toString().toLowerCase().includes(this.searchText.toLowerCase())):false;
        });
    });
      this.tableService.setDataSource(prev);
    }

    this.mdbPagination.calculateFirstItemIndex();
    this.mdbPagination.calculateLastItemIndex();

    
  }


  onNextPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
    this.currentPage++;
  }

  onPreviousPageClick(data: any) {
    this.firstItemIndex = data.first;
    this.lastItemIndex = data.last;
    if(this.currentPage > 1){ this.currentPage --;}
  }

  /**
   * Emit event to service url-deletion
   * @param removeUrl 
   * @param index 
   */
  removeUrl(url:Url): void {
    this.removeElement.emit(url);
  }

}
