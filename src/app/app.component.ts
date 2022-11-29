import { SiteConfigService } from './admin/shared/site-config/site-config.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { mergeMap, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private siteConfigService: SiteConfigService
  ) { }

  ngOnInit() {
    this.siteConfigService.getConfig();

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
      .subscribe((event) => {
        // dynamically set page titles
        let pageTitle = this.title.getTitle();
        if (this.siteConfigService.siteConfig?.eventName) {
          pageTitle = this.siteConfigService.siteConfig?.eventName;
        }
        if (event['title']) {
          pageTitle += ' :: ' + event['title'];
        }
        this.title.setTitle(pageTitle);
        // auto scroll to top on navigation
        window.scrollTo(0, 0);
      });
  }
}
