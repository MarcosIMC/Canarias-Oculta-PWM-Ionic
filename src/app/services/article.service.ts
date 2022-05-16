import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {collection, collectionData, doc, docSnapshots, Firestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Article} from '../class/article';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private firestore: Firestore) { }

  getAll(){
    const articlesCollection = collection(this.firestore, 'articles');
    return collectionData(articlesCollection, {idField: 'id'}).pipe(map(articles => articles as Article[]));
  }

  getArticleByName(id: string):Observable<Article>{

    const article = doc(this.firestore, `articles/${id}`);
    return docSnapshots(article).pipe(map(doc => {
      const id = doc.id;
      const data = doc.data();
      return {id, ...data} as Article;
    }));
  }

  /*getAllByIsland(island: String){
    return new Promise<any>((resolve) => {
      this.db.collection('articles', ref =>
        ref.where('island', '==', island))
        .valueChanges().subscribe(articles => resolve(articles));
    });
  }

  getArticleByName(title: String){
    return new Promise<any>((resolve) => {
      this.db.collection('articles', ref =>
        ref.where('title', '==', title))
        .valueChanges().subscribe(articles => resolve(articles));
    });
  }

  getArticleMainByRating(island: String){
    return new Promise<any>((resolve) => {
      this.db.collection('articles', ref =>
        ref.where('island', '==', island).where('rating', '>=', 1).orderBy('rating').limit(1))
        .valueChanges().subscribe(articles => resolve(articles));
    });
  }*/
}
