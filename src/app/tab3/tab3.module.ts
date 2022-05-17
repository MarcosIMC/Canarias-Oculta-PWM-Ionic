import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import {Tab1PageRoutingModule} from '../tab1/tab1-routing.module';
import {SignInComponent} from '../components/sign-in/sign-in.component';
import {UserPagePageModule} from "../pages/user-page/user-page.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{path: '', component: Tab3Page}]),
        Tab3PageRoutingModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,
        UserPagePageModule,
    ],
  declarations: [Tab3Page, SignInComponent]
})
export class Tab3PageModule {}
