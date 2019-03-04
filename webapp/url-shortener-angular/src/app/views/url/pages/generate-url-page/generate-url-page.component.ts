import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateUrl } from '../../../../shared/validators/url.validator';
import { Url } from '../../../../shared/models/url.model';
import { ValidateHash } from '../../../../shared/validators/hash.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlService } from '../../../../core/services/url/url.service';
import { Dialog } from '../../../../shared/models/dialog.model';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-generate-url-page',
  templateUrl: './generate-url-page.component.html',
  styleUrls: ['./generate-url-page.component.scss']
})
export class GenerateUrlPageComponent implements OnInit {
  private generatedUrlModel: Url;
  public urlForm: FormGroup;
  public hashForm: FormGroup; 
  
  //HTML elements
  @ViewChild('topSection') topSection;
  @ViewChild('generateSection') generateSection;
  @ViewChild('bottomSection') bottomSection;

  private dialogModel: Dialog;

  //Error label handling
  public isGenerateSectionEnabled: boolean;
  public isResultSectionEnabled: boolean;
  public showFormErrorMessages: boolean;

  public urlGenerateErrorMsg: string;
  public urlDeleteErrorMsg: string;
  public urlCustomErrorMsg:string;
  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private urlService: UrlService,
    private modalDialog: MatDialog ) {

  }

  ngOnInit() {

    //Model initialization
    this.generatedUrlModel = new Url();
    this.isGenerateSectionEnabled = false;
    this.isResultSectionEnabled = false;
    //Forms initialization
    this.urlForm = this.fb.group({
      url: ['', [Validators.required, ValidateUrl]]
    });
    this.hashForm = this.fb.group({
      hash: ['', [Validators.required, ValidateHash]]
    });
    this.showFormErrorMessages = false;
  }

  /**
   * @description Page section change
   * @param target 
   */
  scrollToElement(target: HTMLElement){
    setTimeout(()=>{target.scrollIntoView();},100);
    
  }

  /**
   * Validate URL before proceeding
   */
  urlSubmit() {
    if (this.urlForm.invalid) {
      this.showFormErrorMessages = true;
    } else {
      //If the url is ok, then proceed
      this.isGenerateSectionEnabled = true;
      this.isResultSectionEnabled = false;
      this.scrollToElement(this.generateSection.nativeElement);

    }
  }

  /**
   * Validate custom hash code format
   */
  hashSubmit() {
    if (this.hashForm.invalid) {
      this.showFormErrorMessages = true;
    } else {
      this.urlCustomErrorMsg = undefined;
      //If the hash is ok, then proceed
      this.spinner.show();
      this.urlService.postCustomUrl(this.urlForm.get('url').value,this.hashForm.get('hash').value)
      .subscribe(res => {
        //Error exists
        if (res["error"]) {
          if(res["status"] === 0){ //No internet
            this.urlCustomErrorMsg = "No internet connection or the service is temporarily unavailable. Please try again later."
          }else{ //Internal server errors (404, 500, 400)
            this.urlCustomErrorMsg = `Service: ${res["error"]["message"]}`;
          }
          
        } else {
          this.generatedUrlModel.deserialize(res);
          this.isResultSectionEnabled = true;
          this.scrollToElement(this.bottomSection.nativeElement);
        }
        this.spinner.hide();
      }
      );
    }
  }

  /**
   * Generate shorten url
   */
  generateUrl(): void {
    this.urlGenerateErrorMsg = undefined;
    this.spinner.show();
    this.urlService.generateUrl(this.urlForm.get('url').value)
      .subscribe(res => {
        //Error exists
        if (res["error"]) {
          if(res["status"] === 0){ //No internet
            this.urlGenerateErrorMsg = "No internet connection or the service is temporarily unavailable. Please try again later."
          }else{ //Internal server errors (404, 500, 400)
            this.urlGenerateErrorMsg = res["error"]["message"]
          }
         
        } else {
          this.generatedUrlModel.deserialize(res);
          this.isResultSectionEnabled = true;
          this.scrollToElement(this.bottomSection.nativeElement);
        }
        this.spinner.hide();
      }
      );

  }

  /**
   * Remove url using removeToken
   */
  removeUrl(): void {
    this.urlDeleteErrorMsg = undefined; //Re-initialize
    if (this.generatedUrlModel.removeUrl) {
      this.fnOpenRemoveDialog("Remove url", ["Are you sure you want to delete this url?"], "Yes", "Cancel");
    }

  }

  /**
   * @description Open modal dialog
   * @param title 
   * @param body 
   * @param acceptText 
   * @param cancelText 
   */
  fnOpenRemoveDialog(title: string, body: Array<string>, acceptText: string, cancelText: string): void {
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
        this.urlService.deleteUrl(this.generatedUrlModel.removeUrl)
          .subscribe(res => {
            //Error exists
            if (res["error"]) {
              if(res["status"] === 0){ //No internet
                this.urlDeleteErrorMsg = "No internet connection or the service is temporarily unavailable. Please try again later."
              }else{ //Internal server errors (404, 500, 400)
                this.urlDeleteErrorMsg = `Service: ${res["error"]["message"]}`;
              }
              
            } else {
              this.isGenerateSectionEnabled = false;
              this.isResultSectionEnabled = false;
            }
          }
          );

      } else {
        this.urlDeleteErrorMsg = undefined;

      }
    });
  }



}
