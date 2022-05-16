import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../class/article';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.page.html',
  styleUrls: ['./article-page.page.scss'],
})
export class ArticlePagePage implements OnInit, OnDestroy {
  public article: Article;
  sub1: Subscription;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.articleService.getArticleByName(id).subscribe(article => {
      if (!article) {
        this.router.navigate(['']);
      }else {
        this.article = article;
      }
    });
  }

}
