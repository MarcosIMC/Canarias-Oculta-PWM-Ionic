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

  changeFavouriteState() {
    if (!this.authService.isAuthenticated()) {return}
    if (!this.favourite) {
      this.authService.userDetails().subscribe(res=> {
        this.favouriteService.addFavourite(res.uid, this.article.id);
      });
    } else {
      this.authService.userDetails().subscribe(res=> {
        this.favouriteService.deleteFavourite(res.uid, this.article.id);
      });
    }
    this.getFavouriteState().then(res=>{this.favourite = res});
  }

  async getFavouriteState(): Promise<boolean> {
    if (!this.authService.isAuthenticated()) {return false}
    console.log(this.authService.userDetails().pipe(map(user=>user.uid as string)));
    return await this.favouriteService.checkFavourite(this.authService.userDetails().pipe(map(user=>user.uid as string)), this.article.id);
  }
}
