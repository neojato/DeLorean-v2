import { AdminService } from './../services/admin/admin.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public users: FirebaseListObservable<any[]>;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.users = this.adminService.getUserList();
  }

  isAdmin(userKey: string) {
    return this.adminService.isAdmin(userKey);
  }

  updateUser(key: string) {
    this.adminService.toggleAdmin(key);
  }

}
