import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coc',
  templateUrl: './coc.component.html',
  styleUrls: ['./coc.component.scss']
})
export class CocComponent implements OnInit {
  constructor(
    public siteConfigService: SiteConfigService
  ) { }

  ngOnInit() { }
}
