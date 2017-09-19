import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { SpeakerService } from './../shared/speaker.service';
import { Speaker } from './../shared/speaker';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss']
})
export class SpeakerListComponent implements OnInit {
  public speakers: FirebaseListObservable<Speaker[]>;

  constructor(
    private speakerService: SpeakerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.speakers = this.speakerService.getSpeakerList({ orderByChild: 'name' });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  deleteSpeaker(speaker) {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      this.speakerService.deleteSpeaker(speaker.$key);
    }
  }

}
