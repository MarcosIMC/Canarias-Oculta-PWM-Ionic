import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import auth = firebase.auth;
import {error} from 'protractor';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";

export class User {
  uid?:String;
  displayName?:String;
  email?:String;
  password?:String;
  //Article?:[];
  //photo?:String;
  emailVerified?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public idUser = null;
  authState = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth, private router : Router, private  platform : Platform, private db: AngularFirestore) {
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
      this.SetUserData(value.name);
      this.updateValues(value);
    });
  }

  SetUserData(name : string) {
    this.userDetails().subscribe(res => {
      if (res != null) {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${res.uid}`);
        const userData: User = {
          uid: res.uid,
          email: res.email,
          displayName: name,
          //emailVerified: user.emailVerified,
          //photo : user.photo,
        }

        return userRef.set(userData, {
          merge : true,
        });
      }
    }, err => {
      console.log('err', err);
    });
  }

  saveIdUser(id:string){
    this.idUser = id;
  }

  getIdUser(){
    this.userDetails().subscribe(res => {
      if (res != null) {
        return res.uid;
      }
    }, err => {
      console.log('err', err);
    });
  }

  updateValues(value) {
    this.afAuth.onAuthStateChanged(function (user) {
      if (user){
        user.updateProfile(value.name);
      }
    })
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

  getUserData(){
    this.afAuth.onAuthStateChanged(function (user) {
      if (user){
        this.saveIdUser(user.uid);
      }
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log('LOG Out');
            this.idUser = null;
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
