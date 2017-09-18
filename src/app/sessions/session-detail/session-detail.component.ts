import { SessionService } from './../shared/session.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {
  session: Object;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private sessionService: SessionService
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

  getSpeakerDetails(profiles: any[]) {
    const speakerIds = [];
    const returnedArray = [];

    return returnedArray;
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

}
