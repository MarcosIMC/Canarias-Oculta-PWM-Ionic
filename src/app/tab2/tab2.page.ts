import { Component } from '@angular/core';
import {ArticleService} from '../services/article.service';
import {FavouritesService} from '../services/favourites.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public articles;

  constructor(public articleService: ArticleService, private favouriteService: FavouritesService, private authService: AuthService) {
  }

  ionViewDidEnter() {
    this.articles = this.favouriteService.getFavourites(this.authService.idUser);
  }
}
