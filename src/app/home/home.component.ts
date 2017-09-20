import { SiteConfigService } from './../site-config/shared/site-config.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { SpeakerService } from './../speakers/shared/speaker.service';
import { Speaker } from './../speakers/shared/speaker';
import { SiteConfig } from './../site-config/shared/site-config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tempDesc: string;
  tempPhotoURL: string;
  speakers: FirebaseListObservable<Speaker[]>;
  siteConfig: FirebaseObjectObservable<SiteConfig>;

  constructor(private speakerService: SpeakerService, private siteConfigService: SiteConfigService) { }

  ngOnInit() {
    this.speakers = this.speakerService.getSpeakerList({
      orderByChild: 'featured',
      equalTo: true
    });

    this.siteConfig = this.siteConfigService.getConfig();

    // Template Defaults
    this.tempDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.`;
  }

}
