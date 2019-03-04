import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { UrlService } from './services/url/url.service';
import { LoggerService } from './services/logger.service';
import { ConsoleLoggerService } from './services/console-logger.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    HeaderComponent, FooterComponent, PageNotFoundComponent
  ],
  providers:[{ provide: LoggerService, useClass: ConsoleLoggerService } ]
})
export class CoreModule { }
