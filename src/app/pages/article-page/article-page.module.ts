import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlePagePageRoutingModule } from './article-page-routing.module';

import { ArticlePagePage } from './article-page.page';
import {Tab1PageRoutingModule} from "../../tab1/tab1-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePagePageRoutingModule,
    Tab1PageRoutingModule
  ],
  declarations: [ArticlePagePage]
})
export class ArticlePagePageModule {}
