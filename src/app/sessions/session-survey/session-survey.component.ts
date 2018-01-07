import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
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
import { Survey } from './../shared/survey';

@Component({
  selector: 'app-session-survey',
  templateUrl: './session-survey.component.html',
  styleUrls: ['./session-survey.component.scss']
})
export class SessionSurveyComponent implements OnInit {
  session: Session = new Session();
  speaker: Speaker;
  siteConfig: FirebaseObjectObservable<SiteConfig>;
  eventName: string;
  survey: Survey = new Survey();

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

  saveSurvey() {
    this.survey.userID = this.authService.userId;
    this.survey.displayName = this.authService.displayName;
    this.survey.email = this.authService.email;
    this.survey.speakerAvg = (
      Number(this.survey.group1) +
      Number(this.survey.group2) +
      Number(this.survey.group3) +
      Number(this.survey.group4)
    ) / 4;
    this.survey.sessionAvg = (
      Number(this.survey.group5) +
      Number(this.survey.group6) +
      Number(this.survey.group7) +
      Number(this.survey.group8)
    ) / 4;
    this.sessionService.saveSurvey(this.session.$key, this.survey);
    alert('Thank you for your feedback!');
    this.router.navigate([`/sessions/${this.session.$key}`]);
  }

}
