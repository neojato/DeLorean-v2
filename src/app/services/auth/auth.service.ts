import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

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
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        this.afDatabase.object(`/userProfile/${response.user.uid}/`).update({
          displayName: response.user.displayName,
          email: response.user.email,
          photoURL: response.user.photoURL,
          provider: 'Google'
        });
      });
  }

  isLoggedIn() {
    return !!(this.userId !== null);
  }

  userLogout(): firebase.Promise<void> {
    this.userId = null;
    return this.afAuth.auth.signOut();
  }

  isAdmin() {
    return this.afDatabase.object(`/admins/${this.userId}/`);
  }

}
