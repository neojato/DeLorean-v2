import { SpeakerService } from './../../speakers/shared/speaker.service';
import { Router } from '@angular/router';
import { SectionService } from './../shared/section.service';
import { AuthService } from './../../services/auth/auth.service';
import { SessionService } from './../shared/session.service';
import { Session } from './../shared/session';
import { Section } from './../shared/section';
import { AngularFireList } from '@angular/fire/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
  providers: [ModalDirective]
})
export class SessionListComponent implements OnInit {
  public sessions: AngularFireList<Session>;
  public sections: AngularFireList<Section>;
  section: Section = new Section();

  @ViewChild('sectionModal') public sectionModal: ModalDirective;

  constructor(
    private sessionService: SessionService,
    private sectionService: SectionService,
    private speakerService: SpeakerService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sessions = this.sessionService.getSessionList();
    this.sections = this.sectionService.getSectionList();
  }

  openDetails(session) {
    if ((this.authService.isLoggedIn && this.authService.isAdmin) || session.abstract) {
      this.router.navigate([`/sessions/${session.id}`]);
    }
  }

  addSection(value) {
    this.section.title = value.replace(/^\s+|\s+$/g, '');
    this.sectionService.createSection(this.section);
    this.section = new Section();
    this.sectionModal.hide();
  }

  deleteSection(section) {
    if (window.confirm('Are you sure you want to delete this section? This WILL orphan any sessions tied to it!')) {
      this.sectionService.deleteSection(section.id);
    }
  }

  getSpeakerName(speakerKey) {
    return this.speakerService.getSpeakerName(speakerKey);
  }

}
