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
    //if (!this.authService.isAuthenticated()) {console.log("Sin usuario"); return}
    let userId = 0;//await this.authService.userDetails().subscribe(res=> { return res.uid});
    if (!this.favourite) {
      await this.favouriteService.addFavourite(userId, this.article.id);
    } else {
      await this.favouriteService.deleteFavourite(userId, this.article.id);
    }
    this.getFavouriteState().then(res=>{this.favourite = res});
  }

  async getFavouriteState(): Promise<boolean> {
    //if (!this.authService.isAuthenticated()) {return false}
    let userId = 0;//await this.authService.userDetails().subscribe(res=> { return res.uid});
    //console.log(userId);
    return await this.favouriteService.checkFavourite(userId, this.article.id);
  }
}
