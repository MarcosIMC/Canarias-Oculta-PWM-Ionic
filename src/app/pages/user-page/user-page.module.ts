import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPagePageRoutingModule } from './user-page-routing.module';

import { UserPagePage } from './user-page.page';
import {Tab1PageRoutingModule} from "../../tab1/tab1-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPagePageRoutingModule,
        Tab1PageRoutingModule
    ],
    exports: [
        UserPagePage
    ],
    declarations: [UserPagePage]
})
export class UserPagePageModule {}
