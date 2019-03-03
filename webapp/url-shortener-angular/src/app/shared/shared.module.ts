import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlencodeDirective } from './directives/urlencode.directive';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [UrlencodeDirective, DialogComponent],
  imports: [
    CommonModule
  ],
  exports:[UrlencodeDirective,DialogComponent]
})
export class SharedModule { }
