import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {IonicModule} from "@ionic/angular";
import {ArticleComponent} from "../components/article/article.component";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes), IonicModule, CommonModule],
    declarations: [
        NavbarComponent,
        ArticleComponent
    ],
    exports: [RouterModule, NavbarComponent, ArticleComponent]
})
export class Tab1PageRoutingModule {}
