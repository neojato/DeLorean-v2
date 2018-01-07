import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { SessionService } from './../../sessions/shared/session.service';
import { Session } from './../../sessions/shared/session';
import { Survey } from './../../sessions/shared/survey';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
  providers: [ModalDirective]
})
export class SurveysComponent implements OnInit {
  public sessions: FirebaseListObservable<Session[]>;
  public surveyDetail: any;

  @ViewChild('surveyModal') public surveyModal: ModalDirective;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.sessions = this.sessionService.getSessionList();
  }

  showModal(session, survey) {
    this.surveyDetail = {
      group1: survey.group1,
      group2: survey.group2,
      group3: survey.group3,
      group4: survey.group4,
      group5: survey.group5,
      group6: survey.group6,
      group7: survey.group7,
      group8: survey.group8,
      comments: survey.comments,
      displayName: survey.displayName,
      email: survey.email,
      title: session.title
    };
    this.surveyModal.show();
  }

}
