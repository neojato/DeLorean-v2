import { SpeakerService } from './../../speakers/shared/speaker.service';
import { Speaker } from './../../speakers/shared/speaker';
import { SectionService } from './../shared/section.service';
import { Session } from './../shared/session';
import { Router } from '@angular/router';
import { SessionService } from '../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { Section } from './../shared/section';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-session-new',
  templateUrl: './session-new.component.html',
  styleUrls: ['./session-new.component.scss']
})
export class SessionNewComponent implements OnInit {
  session: Session = new Session();
  public sections: FirebaseListObservable<Section[]>;
  public speakers: FirebaseListObservable<Speaker[]>;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private speakerService: SpeakerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sections = this.sectionService.getSectionList({ orderByChild: 'rank' });
    this.speakers = this.speakerService.getSpeakerList({ orderByChild: 'name' });
  }

  save() {
    this.sessionService.createSession(this.session);
    this.session = new Session();
    this.router.navigate(['/sessions']);
  }

}
