import { SpeakerService } from './../../speakers/shared/speaker.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { ScheduleService } from './../shared/schedule.service';
import { SectionService } from './../shared/section.service';
import { SessionService } from './../shared/session.service';
import { Session } from './../shared/session';
import { Section } from './../shared/section';
import { AngularFireList } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {
  public sessions$: AngularFireList<Session>;
  public sections$: AngularFireList<Section>;
  public mySessions$: AngularFireList<any>;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private scheduleService: ScheduleService,
    private speakerService: SpeakerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sessions$ = this.sessionService.getSessionList();
    this.sections$ = this.sectionService.getSectionList();
    this.mySessions$ = this.scheduleService.getScheduleList(this.authService.userId);
  }

  openDetails(session) {
    this.router.navigate([`/sessions/${session.$key}`]);
  }

  getSpeakerName(speakerKey) {
    return this.speakerService.getSpeakerName(speakerKey);
  }

}
