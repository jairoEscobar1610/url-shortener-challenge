import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrlRoutingModule } from './url-routing.module';
import { GenerateUrlPageComponent } from './pages/generate-url-page/generate-url-page.component';
import { UrlListPageComponent } from './pages/url-list-page/url-list-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UrlencodeDirective } from '../../shared/directives/urlencode.directive';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [GenerateUrlPageComponent, UrlListPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UrlRoutingModule,
    SharedModule,
    

  ],
  providers:[]
})
export class UrlModule { }
