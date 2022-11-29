import { TicketService } from './../admin/shared/ticket/ticket.service';
import { LevelService } from './../sponsors/shared/level.service';
import { SponsorService } from './../sponsors/shared/sponsor.service';
import { SiteConfigService } from './../admin/shared/site-config/site-config.service';
import { SpeakerService } from './../speakers/shared/speaker.service';
import { Speaker } from './../speakers/shared/speaker';
import { Sponsor } from './../sponsors/shared/sponsor';
import { Level } from './../sponsors/shared/level';
import { Ticket } from './../admin/shared/ticket/ticket';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  speakers$: Observable<Speaker[]>;
  sponsors$: Observable<Sponsor[]>;
  levels$: Observable<Level[]>;
  tickets$: Observable<Ticket[]>;
  styles: any[];

  constructor(
    private speakerService: SpeakerService,
    public siteConfigService: SiteConfigService,
    private sponsorService: SponsorService,
    private levelService: LevelService,
    private ticketService: TicketService
  ) { }

  ngOnInit() {
    this.speakers$ = this.speakerService.getSpeakerList();

    // Default colors for Ticket Types
    this.styles = ['cyan', 'blue', 'indigo', 'deep-purple'];

    this.sponsors$ = this.sponsorService.getSponsorList();
    this.levels$ = this.levelService.getLevelList();
    this.tickets$ = this.ticketService.getTicketList();
  }

}
