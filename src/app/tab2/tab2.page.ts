import { Component } from '@angular/core';
import {ArticleService} from '../services/article.service';
import {FavouritesService} from '../services/favourites.service';
import {AuthService} from '../services/auth.service';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public articles;

  constructor(public articleService: ArticleService, private favouriteService: FavouritesService, private authService: AuthService, private alertController: AlertController, private router:Router) {
    if (this.authService.idUser == null){
      this.presentAlertConfirm();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Debe iniciar sesión',
      message: 'Para acceder a Favoritos, por favor inicia sesión.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigate(['']);
          }
        }, {
          text: 'Log In',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['/tabs/tab3']);
          }
        }
      ]
    });

    await alert.present();
  }

  ionViewDidEnter() {
    this.articles = this.favouriteService.getFavourites(this.authService.idUser);
  }
}
