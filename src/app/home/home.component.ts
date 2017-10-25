import { TicketService } from './../admin/shared/ticket/ticket.service';
import { LevelService } from './../sponsors/shared/level.service';
import { SponsorService } from './../sponsors/shared/sponsor.service';
import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { SpeakerService } from './../speakers/shared/speaker.service';
import { Speaker } from './../speakers/shared/speaker';
import { Sponsor } from './../sponsors/shared/sponsor';
import { Level } from './../sponsors/shared/level';
import { Ticket } from './../admin/shared/ticket/ticket';
import { SiteConfig } from './../admin/shared/site-config/site-config';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tempDesc: string;
  tempPhotoURL: string;
  speakers: Observable<Speaker[]>;
  siteConfig: Observable<SiteConfig>;
  sponsors: Observable<Sponsor[]>;
  levels: Observable<Level[]>;
  tickets: Observable<Ticket[]>;
  styles: any[];

  constructor(
    private speakerService: SpeakerService,
    private siteConfigService: SiteConfigService,
    private sponsorService: SponsorService,
    private levelService: LevelService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.speakers = this.speakerService.getFeaturedSpeakerList();

    this.styles = ['cyan', 'blue', 'indigo', 'deep-purple'];

    this.siteConfig = this.siteConfigService.getConfig();
    this.sponsors = this.sponsorService.getSponsorList();
    this.levels = this.levelService.getLevelList();
    this.tickets = this.ticketService.getTicketList();
  }

}
