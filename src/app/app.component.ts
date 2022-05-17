import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router:Router, private platform:Platform, private fAuth:AuthService) {
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
  }
}
