import { SpeakerService } from './../../speakers/shared/speaker.service';
import { SessionService } from './../shared/session.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Speaker } from '../../speakers/shared/speaker';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {
  session: Object;
  profiles: any[];
  speaker: Speaker;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private sessionService: SessionService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      const id = params['id'];
      this.sessionService.getSession(id).subscribe(session => {
        this.session = session;
        this.getSpeakerDetails(session.speakers);
      });
    });
  }

  getSpeakerDetails(speakers: any[]) {
    const profiles = [];
    for (const speaker of speakers) {
      profiles.push(this.speakerService.getSpeaker(speaker));
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
