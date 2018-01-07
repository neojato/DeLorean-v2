import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public userId: string = null;
  public displayName: string = null;
  public email: string = null;

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.displayName = user.displayName;
        this.email = user.email;
      }
    });
  }

  userLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getProfile() {
    return this.afDatabase.object(`/userProfile/${this.userId}/`);
  }

  isLoggedIn() {
    return !!(this.userId !== null);
  }

  userLogout(): Promise<void> {
    this.userId = null;
    this.displayName = null;
    this.email = null;
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
