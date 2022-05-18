import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private articles: any[];
  private dbInstance: SQLiteObject;
  private readonly dbName: string = 'remotestack.db';
  private readonly dbTable: string = 'favouriteTable';
  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({name: this.dbName, location: 'default'})
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`
                    CREATE TABLE IF NOT EXISTS ${this.dbTable} (
                    user_id STRING PRIMARY KEY,
                    article_id STRING`, [])
            .then((res) => {
              alert(JSON.stringify(res));
            })
            .catch((error) => alert(JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

  public addFavourite(userId, articleId) {
    this.dbInstance.executeSql(`
        INSERT INTO ${this.dbTable} (user_id, article_id) VALUES ('${userId}', '${articleId}')`, [])
      .then(() => {
        alert('Success');
      }, (e) => { alert(JSON.stringify(e.err)); });
  }

  public deleteFavourite(userId, articleId) {
    this.dbInstance.executeSql(`
        DELETE FROM ${this.dbTable} WHERE user_id = '${userId}' AND article_id = '${articleId}'`, [])
      .then(() => {
        alert('Success');
      }, (e) => { alert(JSON.stringify(e.err)); });
  }

  public checkFavourite(userId, articleId): boolean {
    let isFavourite = false;
    this.dbInstance.executeSql(`
    SELECT article_id FROM '${this.dbTable}' WHERE user_id = '${userId}' AND article_id = '${articleId}'`, []).then((res) => {
    isFavourite =  res.rows.length > 0;
    },(e) => {
      alert(JSON.stringify(e));
    });
    return isFavourite;
  }

  public getFavourites(userId) {
    return this.dbInstance.executeSql(`
    SELECT article_id FROM '${this.dbTable}' WHERE user_id = '${userId}'`, []).then((res) => {
    this.articles = [];
    if (res.rows.length > 0) {
    for (let i = 0; i < res.rows.length; i++) {
    this.articles.push(res.rows.item(i));
    }
    return this.articles;
    }
    },(e) => {
    alert(JSON.stringify(e));
    });
  }

}

