import { Pipe, PipeTransform } from '@angular/core';
import {Article} from "./article";

@Pipe({
  name: 'article'
})
export class ArticlePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value as Article;
  }

}
