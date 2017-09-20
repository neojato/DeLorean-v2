import { UserService } from './../shared/user/user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: FirebaseListObservable<any[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUserList({ orderByChild: 'displayName' });
  }

  isAdmin(userKey: string) {
    return this.userService.isAdmin(userKey);
  }

  updateUser(key: string) {
    this.userService.toggleAdmin(key);
  }

}
