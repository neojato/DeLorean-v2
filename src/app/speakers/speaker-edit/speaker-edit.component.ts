import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { SpeakerService } from './../shared/speaker.service';
import { Speaker } from './../shared/speaker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.scss']
})
export class SpeakerEditComponent implements OnInit {
  speaker: Speaker = new Speaker();
  activeKey: string;

  constructor(
    private speakerService: SpeakerService,
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.speakerService.getSpeaker(this.activeKey).subscribe(speaker => {
        this.speaker = speaker;
      });
    });
  }

  updateSpeaker() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('photoURL')).files[0]]) {
      photo = selectedFile;
    }
    this.speakerService.updateSpeaker(this.speaker, photo);
    this.speaker = new Speaker();
    this.router.navigate(['/speakers']);
  }

}
