import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Article} from '../class/article';
import {ArticleService} from '../services/article.service';
import {FavouritesService} from '../services/favourites.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public articles: any[];

  constructor(private articleService: ArticleService, private favouriteService: FavouritesService, private authService: AuthService) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const articleIds = this.favouriteService.getFavourites((<any>authService.userDetails()).uid);
    // eslint-disable-next-line guard-for-in
    for (const article in articleIds){
      this.articles.push(this.articleService.getArticleById(article));
    }
  }

}
