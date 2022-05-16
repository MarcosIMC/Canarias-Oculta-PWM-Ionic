import { Component } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {Article} from "../class/article";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public articles: Observable<Article[]>;

  constructor(private articleService : ArticleService) {
    this.articles = this.articleService.getAll();
  }

}
