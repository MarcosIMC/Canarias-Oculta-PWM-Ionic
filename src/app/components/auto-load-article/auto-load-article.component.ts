import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../class/article";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-auto-load-article',
  templateUrl: './auto-load-article.component.html',
  styleUrls: ['./auto-load-article.component.scss'],
})
export class AutoLoadArticleComponent implements OnInit {
  public article;
  private sub1;

  @Input() id!: string;
  constructor(public _articleService : ArticleService) {
  }

  ngOnInit() {
    this.sub1 = this._articleService.getArticleById(this.id).subscribe(article => {
      this.article = article;
    });
  }

}
