import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlencodeDirective } from './directives/urlencode.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [UrlencodeDirective, DialogComponent, LoaderComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports:[UrlencodeDirective,DialogComponent,LoaderComponent]
})
export class SharedModule { }
