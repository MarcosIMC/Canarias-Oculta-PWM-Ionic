import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Article} from '../class/article';
import {ArticleService} from '../services/article.service';
import {FavouritesService} from '../services/favourites.service';
import {AuthService} from '../services/auth.service';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public articles: any[];

  constructor(private articleService: ArticleService, private favouriteService: FavouritesService, private authService: AuthService) {
  }

  ionViewDidEnter() {
    this.authService.userDetails().subscribe(res => {
      if (res != null) {
        console.log(res.uid);
        this.favouriteService.getFavourites(res.uid).then(
          ret => {
            for (const article in ret) {
              this.articles.push(this.articleService.getArticleById(article));
            }
          });
      }
    });
  }
}
