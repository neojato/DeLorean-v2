import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class UserService {
  private basePath = '/userProfile';
  users: FirebaseListObservable<any[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getUserList(): FirebaseListObservable<any[]> {
    this.users = this.db.list(this.basePath);
    return this.users;
  }

  getUserQuery(offset, startKey?): FirebaseListObservable<any[]> {
    this.users = this.db.list(this.basePath, {
      query: {
        orderByKey: true,
        startAt: startKey,
        limitToFirst: offset + 1
      }
    });
    return this.users;
  }

  isAdmin(key: string) {
    let isAdmin: boolean;
    this.db.object(`/admins/${key}`).subscribe(snapshot => {
      isAdmin = snapshot.$value;
    });
    return isAdmin;
  }

  toggleAdmin(key: string): void {
    const tempAdmin: boolean = this.isAdmin(key) || false;
    if (tempAdmin) {
      this.db.object(`/admins/${key}`).remove();
    } else {
      this.db.object(`/admins/${key}`).set(true);
    }
  }

}
