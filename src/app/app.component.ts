import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {AuthService} from "./services/auth.service";
import {FavouritesService} from "./services/favourites.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private initPlugin: boolean;
  constructor(private router:Router, private platform:Platform, private fAuth:AuthService,
              private _sqlite: FavouritesService) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
      this.fAuth.authState.subscribe(state => {
        if(state) {
          this.router.navigate(['user-page']);
        }
      });
    });
    this.platform.ready().then(async () => {
      this._sqlite.initializePlugin().then(ret => {
        this.initPlugin = ret;
        console.log('>>>> in App  this.initPlugin ' + this.initPlugin);
        this._sqlite.closeAllConnections();
        console.log('ñPrueba de cambios 18ñ');
        this._sqlite.createTable();
      });
    });
  }
}
