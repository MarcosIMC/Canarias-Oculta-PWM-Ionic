import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireModule} from '@angular/fire/compat';

import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {FavouritesService} from './services/favourites.service';
import { ArticlePipe } from './class/article.pipe';

@NgModule({
  declarations: [AppComponent, ArticlePipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase), provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthGuard, AuthService, {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, FavouritesService],
  bootstrap: [AppComponent],
  exports: [
    ArticlePipe
  ]
})
export class AppModule {}
