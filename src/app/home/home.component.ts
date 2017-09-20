import { FirebaseListObservable } from 'angularfire2/database';
import { SpeakerService } from './../speakers/shared/speaker.service';
import { Speaker } from './../speakers/shared/speaker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public map: any = {
    zoom: 18,
    scrollwheel: false,
    center: {
      lat: 39.099105,
      lng: -94.5854192
    },
    venue: {
      lat: 39.0988427,
      lng: -94.5847314,
      label: ''
    },
    parking: {
      lat: 39.099385,
      lng: -94.5860648,
      label: 'P'
    }
  };
  speakers: FirebaseListObservable<Speaker[]>;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.speakers = this.speakerService.getSpeakerList({
      orderByChild: 'featured',
      equalTo: true
    });
  }

}
