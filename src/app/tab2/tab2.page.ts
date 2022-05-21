import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Article} from '../class/article';
import {ArticleService} from '../services/article.service';
import {FavouritesService} from '../services/favourites.service';
import {AuthService} from '../services/auth.service';
import {map} from "rxjs/operators";
import {ArticlePagePage} from "../pages/article-page/article-page.page";
import {ArticlePipe} from "../class/article.pipe";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public articles: Promise<string[]>;

  constructor(public articleService: ArticleService, private favouriteService: FavouritesService, private authService: AuthService) {
  }

  ionViewDidEnter() {
    this.articles = this.favouriteService.getFavourites(0);
  }
}
