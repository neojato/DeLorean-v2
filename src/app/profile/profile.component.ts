import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Object;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.profile = this.authService.getProfile();
  }

}
