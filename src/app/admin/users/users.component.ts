import { UserService } from './../shared/user/user.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public usersList: FirebaseListObservable<any[]>;
  users: any[] = [];
  nextKey: any;
  prevKeys: any[] = [];
  subscription: any;
  offset: number;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.offset = 10;
    this.getUsers();
    this.usersList = this.userService.getUserList();
  }

  isAdmin(userKey: string) {
    return this.userService.isAdmin(userKey);
  }

  updateUser(key: string) {
    this.userService.toggleAdmin(key);
  }

  nextPage() {
    this.prevKeys.push(_.first(this.users)['$key']);
    this.getUsers(this.nextKey);
  }

  prevPage() {
    const prevKey = _.last(this.prevKeys);
    this.prevKeys = _.dropRight(this.prevKeys);
    this.getUsers(prevKey);
  }

  private getUsers(key?) {
    this.subscription = this.userService.getUserQuery(this.offset, key)
      .subscribe(users => {
        this.users = _.slice(users, 0, this.offset);
        this.nextKey = _.get(users[this.offset], '$key');
      });
  }

}
