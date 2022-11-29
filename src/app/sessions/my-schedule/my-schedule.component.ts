import { SpeakerService } from './../../speakers/shared/speaker.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { ScheduleService } from './../shared/schedule.service';
import { SectionService } from './../shared/section.service';
import { SessionService } from './../shared/session.service';
import { Session } from './../shared/session';
import { Section } from './../shared/section';
import { Speaker } from './../../speakers/shared/speaker';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {
  public sessions$: Observable<Session[]>;
  public sections$: Observable<Section[]>;
  public mySessions$: Observable<any[]>;
  public speakers: Speaker[];

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private scheduleService: ScheduleService,
    private speakerService: SpeakerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.speakerService.getSpeakerList().subscribe(speakers => this.speakers = speakers);
    this.sessions$ = this.sessionService.getSessionList();
    this.sections$ = this.sectionService.getSectionList();
    this.mySessions$ = this.scheduleService.getScheduleList(this.authService.userId)
        .pipe(map(sessions => sessions.map(session => {
          return {
            ...session,
            speakerNames: session.speakers ? session.speakers.map(speakerId => this.speakers.find(speaker => speaker.id === speakerId).name) : null 
          }
        })
      ));
  }

  openDetails(session) {
    this.router.navigate([`/sessions/${session.id}`]);
  }
}
