import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public userId: string = null;

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  userLogin(): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getProfile() {
    return this.afDatabase.object(`/userProfile/${this.userId}/`);
  }

  isLoggedIn() {
    return !!(this.userId !== null);
  }

  userLogout(): firebase.Promise<void> {
    this.userId = null;
    return this.afAuth.auth.signOut();
  }

  isAdmin() {
    let isAdmin: boolean;
    this.afDatabase.object(`/admins/${this.userId}`).subscribe(snapshot => {
      isAdmin = snapshot.$value;
    });
    return isAdmin;
  }

}
