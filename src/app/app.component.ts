import { SiteConfigService } from './admin/shared/site-config/site-config.service';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { SiteConfig } from './admin/shared/site-config/site-config';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  siteConfig: FirebaseObjectObservable<SiteConfig>;
  eventName: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private siteConfigService: SiteConfigService
  ) { }

  ngOnInit() {
    this.siteConfig = this.siteConfigService.getConfig();

    this.siteConfig.subscribe(snap => {
      this.eventName = snap.eventName;
    });

    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        // dynamically set page titles
        let pageTitle = this.title.getTitle();
        if (this.eventName) {
          pageTitle = this.eventName;
        }
        if (event['title']) {
          pageTitle += ' :: ' + event['title'];
        }
        this.title.setTitle(pageTitle);
        // Google Analytics track pageview
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
        // auto scroll to top on navigation
        window.scrollTo(0, 0);
      });
  }
}
