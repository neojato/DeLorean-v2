import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { SpeakerService } from './../shared/speaker.service';
import { Speaker } from './../shared/speaker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss']
})
export class SpeakerListComponent implements OnInit {
  @ViewChild('speakerModal') public speakerModal: ModalDirective;

  public speakers: Observable<Speaker[]>;
  public speakerDetail: any;

  constructor(
    private speakerService: SpeakerService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.speakers = this.speakerService.getSpeakerList();
  }

  deleteSpeaker(speaker) {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      this.speakerService.deleteSpeaker(speaker.id);
    }
  }

  showModal(speaker) {
    this.speakerDetail = {
      name: speaker.name,
      title: speaker.title,
      company: speaker.company,
      description: speaker.description,
      googleLink: speaker.googleLink,
      facebookLink: speaker.facebookLink,
      twitterLink: speaker.twitterLink,
      linkedinLink: speaker.linkedinLink,
      githubLink: speaker.githubLink,
      websiteLink: speaker.websiteLink
    };
    this.speakerModal.show();
  }

}
