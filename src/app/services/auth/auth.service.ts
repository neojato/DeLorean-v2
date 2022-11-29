import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public userId: string = null;
  public displayName: string = null;
  public email: string = null;
  public isAdmin: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.displayName = user.displayName;
        this.email = user.email;
        this.isLoggedIn = !!(this.userId !== null);
        this.setAdmin();
      }
    });
  }

  userLogin(): Promise<any> {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getProfile() {
    return this.afDatabase.object(`/userProfile/${this.userId}/`);
  }

  userLogout(): Promise<void> {
    this.userId = null;
    this.displayName = null;
    this.email = null;
    this.isAdmin = false;
    this.isLoggedIn = false;
    return this.afAuth.signOut();
  }

  setAdmin() {
    const user = this.afDatabase.object<boolean>(`/admins/${this.userId}`).valueChanges();
    user.subscribe(snapshot => {
      this.isAdmin = snapshot;
    });
  }
}