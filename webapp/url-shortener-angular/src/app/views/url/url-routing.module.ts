import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateUrlPageComponent } from './pages/generate-url-page/generate-url-page.component';
import { UrlListPageComponent } from './pages/url-list-page/url-list-page.component';

const routes: Routes = [
  { path: 'generate', component:GenerateUrlPageComponent},
  { path: 'list', component:UrlListPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UrlRoutingModule { }
