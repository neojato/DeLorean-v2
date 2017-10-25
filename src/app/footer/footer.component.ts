import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { SiteConfig } from './../admin/shared/site-config/site-config';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  siteConfig: Observable<SiteConfig>;
  copyright = new Date().getFullYear();

  constructor(private siteConfigService: SiteConfigService) { }

  ngOnInit() {
    this.siteConfig = this.siteConfigService.getConfig();
  }

}
