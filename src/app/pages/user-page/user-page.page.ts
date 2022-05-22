import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {
  userEmail: string;
  userName: string;
  userId: string;

  constructor(private navCtrl: NavController, private authService: AuthService, private articleService: ArticleService) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      if (res != null) {
        this.userEmail = res.email;
        this.userId = res.uid;
        this.authService.saveIdUser(res.uid);
        this.articleService.getUserDetails(this.userId).subscribe(ret =>{
          this.userName = ret.displayName as string;
        });
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });
  }

  logout() {
    this.authService.logoutUser().then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    }).catch(error => {
      console.log(error);
    });
  }

}
