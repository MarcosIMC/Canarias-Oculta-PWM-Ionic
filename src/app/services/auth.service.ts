import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import auth = firebase.auth;
import {error} from 'protractor';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth, private router : Router, private  platform : Platform) {
    this.platform.ready().then(() => {
      //this.ifLoggedIn();
    });
  }

  /*ifLoggedIn(){
    this.storage.get('user').then((response) => {
      if(response){
        this.authState.next(true);
      }
    });
  }*/

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res),
          err => reject(err));
    });
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res),
          err => reject(err));
    });
  }

  userDetails() {
    return this.afAuth.user;
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log('LOG Out');
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            resolve;
          }).catch((error) => {
          reject();
        });
      }
    });
  }

  isAuthenticated(){
    return this.authState.value;
  }
}
