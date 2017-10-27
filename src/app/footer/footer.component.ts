import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { SiteConfig } from './../admin/shared/site-config/site-config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  siteConfig: FirebaseObjectObservable<SiteConfig>;
  copyright = new Date().getFullYear();

  constructor(private siteConfigService: SiteConfigService) { }

  ngOnInit() {
    this.siteConfig = this.siteConfigService.getConfig();
  }

}
