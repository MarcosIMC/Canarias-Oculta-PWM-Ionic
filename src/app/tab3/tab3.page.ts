import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  res = null;
  constructor(private router: Router, private fAuth: AuthService, private navCtrl: NavController, private platform: Platform) {
    this.isLogged();
  }

  ngOnInit(): void {  }

  isLogged() {
    this.fAuth.userDetails().subscribe(res => {
      if (res != null) {
        this.navCtrl.navigateForward('/user-page');
      }
    }, err => {
      console.log('err', err);
    });
  }
}
