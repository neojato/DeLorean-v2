import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private basePath = '/userProfile';

  usersRef: AngularFireList<any[]> = null;
  users: Observable<any[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getUserList(offset, startKey?): Observable<any[]> {
    // ref.orderByKey(true).startAt(startKey).limitToFirst((offset + 1))
    this.usersRef = this.db.list(this.basePath);
    return this.users = this.usersRef.valueChanges();
  }

  isAdmin(key: string) {
    let isAdmin: boolean;
    this.db.object(`/admins/${key}`).snapshotChanges().subscribe(snapshot => {
      isAdmin = snapshot.payload.val();
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
