import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyright = new Date().getFullYear();

  constructor(public siteConfigService: SiteConfigService) { }

  ngOnInit() { }

}
