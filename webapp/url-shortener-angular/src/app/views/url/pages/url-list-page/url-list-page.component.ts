import { MdbTablePaginationComponent, MdbTableService, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, AfterViewInit } from '@angular/core';
import { Url } from '../../../../shared/models/url.model';
import { Dialog } from '../../../../shared/models/dialog.model';
import { MatDialog } from '@angular/material';
import { UrlService } from '../../../../core/services/url/url.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-url-list-page',
  templateUrl: './url-list-page.component.html',
  styleUrls: ['./url-list-page.component.scss']
})
export class UrlListPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbPagination: MdbTablePaginationComponent;
  @ViewChild('row') row: ElementRef;

  elements: Array<Url> = new Array<Url>();
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

  private dialogModel: Dialog;

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
    this.fetchList();
  }

  ngAfterViewInit() {
  }

  /**
   * Get url list
   */
  fetchList(): void {
    this.urlListErrorMsg = undefined;
    this.spinner.show();
    this.urlService.getUrlList(-1,this.currentPage,"createdAt","asc")
      .subscribe(res => {
        //Error exists
        if (res["error"]) {
          this.urlListErrorMsg = res["error"]["message"]
        } else {
          this.elements = res["list"];
          this.pages = res["pages"];
         
        }
        this.spinner.hide();
      }
      );

  }

  /**
   * Remove url using removeToken
   */
  removeUrl(removeUrl:Url): void {
    this.urlDeleteErrorMsg = undefined; //Re-initialize
    if (removeUrl) {
      this.fnOpenRemoveDialog(removeUrl,"Remove url", 
      ["Are you sure you want to delete this url?",`${removeUrl.shorten}`], "Yes", "Cancel");
    }

  }

  /**
   * Open modal dialog
   */
  fnOpenRemoveDialog(urlToRemove:Url, title: string, body: Array<string>, acceptText: string, cancelText: string): void {
    //Initialize dialog data
    if (!this.dialogModel) {
      this.dialogModel = new Dialog();
    }
    this.dialogModel.title = title;
    this.dialogModel.body = body;
    this.dialogModel.acceptText = acceptText;
    this.dialogModel.cancelText = cancelText;
    let dialogRef = this.modalDialog.open(DialogComponent, {
      data:this.dialogModel,
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(result => {
      //If dialog closed as 'accepted'
      if (result.data) {
        this.urlService.deleteUrl(urlToRemove.removeUrl)
          .subscribe(res => {
            //Error exists
            if (res["error"]) {
              this.urlDeleteErrorMsg = `Service: ${res["error"]["message"]}`;
            } else {
              this.elements.splice(
                this.elements.findIndex(elem=>{
                  return elem._id === urlToRemove._id
                }),1
              )
            }
          }
          );

      } else {
        this.urlDeleteErrorMsg = undefined;

      }
    });
  }

}
