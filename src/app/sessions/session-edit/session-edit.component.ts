import { SectionService } from './../shared/section.service';
import { Session } from './../shared/session';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../shared/session.service';
import { Component, OnInit } from '@angular/core';
import { Section } from './../shared/section';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.scss']
})
export class SessionEditComponent implements OnInit {
  public sections: FirebaseListObservable<Section[]>;
  session: Session = new Session();

  activeKey: string;
  activeSection: string;
  activeRoom: string;
  activeTitle: string;
  activeTime: string;
  activeTag: string;
  activeLevel: string;
  activeAbstract: string;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.sessionService.getSession(this.activeKey).subscribe(session => {
        this.session = session;

        this.activeSection = this.session.section;
        this.activeRoom = this.session.room;
        this.activeTitle = this.session.title;
        this.activeTime = this.session.time;
        this.activeTag = this.session.tag;
        this.activeLevel = this.session.level;
        this.activeAbstract = this.session.abstract;
      });
    });

    this.sections = this.sectionService.getSectionList();
  }

  updateSession() {
    const updSession = {
      section: this.activeSection,
      room: this.activeRoom,
      title: this.activeTitle,
      time: this.activeTime,
      tag: this.activeTag,
      level: this.activeLevel,
      abstract: this.activeAbstract
    };
    const saveForm = Object.assign(this.session, updSession);

    this.sessionService.updateSession(this.activeKey, updSession);
    this.router.navigate(['/sessions']);
  }

}
