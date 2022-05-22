import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import {Tab1PageRoutingModule} from "../tab1/tab1-routing.module";
import {AutoLoadArticleComponent} from "../components/auto-load-article/auto-load-article.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab2Page, AutoLoadArticleComponent]
})
export class Tab2PageModule {}
