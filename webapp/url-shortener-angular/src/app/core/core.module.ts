import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { UrlService } from './services/url/url.service';
import { LoggerService } from './services/logger.service';
import { ConsoleLoggerService } from './services/console-logger.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent, FooterComponent, PageNotFoundComponent
  ],
  providers:[{ provide: LoggerService, useClass: ConsoleLoggerService } ]
})
export class CoreModule { }
