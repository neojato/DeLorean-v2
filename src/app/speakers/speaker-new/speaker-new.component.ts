import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { SpeakerService } from './../shared/speaker.service';
import { Speaker } from './../shared/speaker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker-new',
  templateUrl: './speaker-new.component.html',
  styleUrls: ['./speaker-new.component.scss']
})
export class SpeakerNewComponent implements OnInit {
  speaker: Speaker = new Speaker();

  constructor(
    private speakerService: SpeakerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  addSpeaker() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('photoURL')).files[0]]) {
      photo = selectedFile;
    }
    this.speakerService.createSpeaker(this.speaker, photo);
    this.speaker = new Speaker();
    this.router.navigate(['/speakers']);
  }

}
