import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { SiteConfig } from './../admin/shared/site-config/site-config';
import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  siteConfig: Observable<SiteConfig>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private siteConfigService: SiteConfigService
  ) { }

  ngOnInit() {
    this.siteConfig = this.siteConfigService.getConfig();
  }

  userLogin() {
    this.authService.userLogin().then(() => this.router.navigate(['/home']), alert);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  userLogout() {
    this.authService.userLogout().then(() => this.router.navigate(['/home']), alert);
  }
}
