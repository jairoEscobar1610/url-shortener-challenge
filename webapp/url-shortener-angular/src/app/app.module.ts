import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { HomeModule } from './views/home/home.module';
import { UrlModule } from './views/url/url.module';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UrlencodeDirective } from './shared/directives/urlencode.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { UrlService } from './core/services/url/url.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MaterialModule } from './material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HomeModule,
    UrlModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  entryComponents:[
    DialogComponent
  ],
  providers: [MatDialogModule, MatDialog,
    { provide: MatDialogRef, useValue: {} },
	{ provide: MAT_DIALOG_DATA, useValue: [] },],
  bootstrap: [AppComponent]
})
export class AppModule { }
