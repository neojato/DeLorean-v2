import { FirebaseObjectObservable } from 'angularfire2/database';
import { SiteConfig } from './../../admin/shared/site-config/site-config';
import { SiteConfigService } from './../../admin/shared/site-config/site-config.service';
import { Title } from '@angular/platform-browser';
import { SpeakerService } from './../../speakers/shared/speaker.service';
import { SessionService } from './../shared/session.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Speaker } from '../../speakers/shared/speaker';
import { Session } from '../../sessions/shared/session';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {
  session: Session = new Session();
  profiles: any[];
  speaker: Speaker;
  siteConfig: FirebaseObjectObservable<SiteConfig>;
  eventName: string;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private sessionService: SessionService,
    private speakerService: SpeakerService,
    private title: Title,
    private siteConfigService: SiteConfigService
  ) { }

  ngOnInit() {
    this.siteConfig = this.siteConfigService.getConfig();

    this.siteConfig.subscribe(snap => {
      this.eventName = snap.eventName;
    });

    this.activatedRouter.params.subscribe((params) => {
      const id = params['id'];
      this.sessionService.getSession(id).subscribe(session => {
        this.session = session;
        this.getSpeakerDetails(session.speakers);
        // dynamically set page titles
        let pageTitle = this.title.getTitle();
        if (this.eventName) {
          pageTitle = this.eventName;
        }
        if (this.session.title) {
          pageTitle += ' :: ' + this.session.title;
        }
        this.title.setTitle(pageTitle);
      });
    });
  }

  getSpeakerDetails(speakers: any[]) {
    const profiles = [];
    if (speakers) {
      for (const speaker of speakers) {
        profiles.push(this.speakerService.getSpeaker(speaker));
      }
    }
    this.profiles = profiles;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  editDetails(session) {
    this.router.navigate([`/sessions/${session.$key}/edit`]);
  }

  delete(session) {
    if (window.confirm('Are you sure you want to delete this session?')) {
      this.sessionService.deleteSession(session.$key);
      this.router.navigate(['/sessions']);
    }
  }

}
