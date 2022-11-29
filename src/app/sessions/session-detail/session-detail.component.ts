import { ScheduleService } from './../shared/schedule.service';
import { SiteConfigService } from './../../admin/shared/site-config/site-config.service';
import { Title } from '@angular/platform-browser';
import { SpeakerService } from './../../speakers/shared/speaker.service';
import { SessionService } from './../shared/session.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Session } from '../../sessions/shared/session';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {
  session: Session = new Session();
  profiles: any[];
  mySchedule: any;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public authService: AuthService,
    private sessionService: SessionService,
    private speakerService: SpeakerService,
    private title: Title,
    public siteConfigService: SiteConfigService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      const id = params['id'];
      this.sessionService.getSession(id)
        .pipe(switchMap(session => {
          this.session = session;
          this.getSpeakerDetails(session.speakers);
          // dynamically set page titles
          let pageTitle = this.title.getTitle();
          if (this.siteConfigService.siteConfig?.eventName) {
            pageTitle = this.siteConfigService.siteConfig?.eventName;
          }
          if (this.session.title) {
            pageTitle += ' :: ' + this.session.title;
          }
          this.title.setTitle(pageTitle);
          return this.scheduleService.getScheduleSession(this.authService.userId, this.session.id);
        }))
        .subscribe(schedule => this.mySchedule = schedule);
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

  userLogin() {
    this.authService.userLogin().then(() => window.location.reload());
  }

  editDetails(session) {
    this.router.navigate([`/sessions/${session.id}/edit`]);
  }

  delete(session) {
    if (window.confirm('Are you sure you want to delete this session?')) {
      this.sessionService.deleteSession(session.id);
      this.router.navigate(['/sessions']);
    }
  }

  addToSchedule() {
    this.scheduleService.setSchedule({
      id: this.session.id,
      title: this.session.title,
      time: this.session.time,
      tag: this.session.tag ? this.session.tag : null,
      speakers: this.session.speakers,
      room: this.session.room ? this.session.room : null,
      section: this.session.section,
      value: true
    });
  }

  removeFromSchedule() {
    this.scheduleService.removeFromSchedule();
  }

  openFeedback(session) {
    if ((this.authService.isLoggedIn)) {
      this.router.navigate([`/sessions/${session.id}/survey`]);
    }
  }

}