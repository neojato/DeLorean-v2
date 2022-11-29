import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class UserService {
  private basePath = '/userProfile';
  users: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getUserList(): AngularFireList<any> {
    this.users = this.db.list(this.basePath);
    return this.users;
  }

  getUserQuery(offset, startKey?): AngularFireList<any> {
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
