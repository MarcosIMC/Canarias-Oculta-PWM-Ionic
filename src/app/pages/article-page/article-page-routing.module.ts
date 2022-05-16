import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlePagePage } from './article-page.page';

const routes: Routes = [
  {
    path: '',
    component: ArticlePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlePagePageRoutingModule {}
