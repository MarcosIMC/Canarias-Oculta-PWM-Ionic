import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../class/article';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FavouritesService} from '../../services/favourites.service';
import {AuthService} from '../../services/auth.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.page.html',
  styleUrls: ['./article-page.page.scss'],
})
export class ArticlePagePage implements OnInit, OnDestroy {
  public article: Article;
  sub1: Subscription;
  favourite: boolean;

  constructor(private articleService: ArticleService, private favouriteService: FavouritesService,
              private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.articleService.getArticleById(id).subscribe(article => {
      if (!article) {
        this.router.navigate(['']);
      }else {
        this.article = article;
      }
    });
  }

  ionViewDidEnter() {
    this.getFavouriteState().then(res=>{this.favourite = res});
  }

  async changeFavouriteState() {
    let userId = this.authService.idUser;
    if (!this.favourite) {
      await this.favouriteService.addFavourite(userId, this.article.id);
    } else {
      await this.favouriteService.deleteFavourite(userId, this.article.id);
    }
    this.getFavouriteState().then(res=>{this.favourite = res});
  }

  async getFavouriteState(): Promise<boolean> {
    let userId = this.authService.idUser;
    if (userId === null) {return false}
    return await this.favouriteService.checkFavourite(userId, this.article.id);
  }
}
