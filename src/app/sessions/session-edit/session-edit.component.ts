import { SpeakerService } from './../../speakers/shared/speaker.service';
import { Speaker } from './../../speakers/shared/speaker';
import { SectionService } from './../shared/section.service';
import { Session } from './../shared/session';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { Section } from './../shared/section';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.scss']
})
export class SessionEditComponent implements OnInit {
  public sections: Observable<Section[]>;
  public speakers: Observable<Speaker[]>;
  session: Session = new Session();
  activeKey: string;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private speakerService: SpeakerService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.sessionService.getSession(this.activeKey).subscribe(session => {
        this.session = session;
      });
    });

    this.sections = this.sectionService.getSectionList();
    this.speakers = this.speakerService.getSpeakerList();
  }

  updateSession() {
    this.sessionService.updateSession(this.activeKey, this.session);
    this.router.navigate(['/sessions']);
  }

}
