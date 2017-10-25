import { Injectable } from '@angular/core';
import { Speaker } from './speaker';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpeakerService {
  private basePath: string = firebaseConfig.devfestYear + '/speakers';
  private firebaseStorage: any;

  speakersRef: AngularFireList<Speaker[]> = null;
  speakers: Observable<Speaker[]> = null;

  speakerRef: AngularFireObject<Speaker> = null;
  speaker: Observable<Speaker> = null;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getSpeakerList(): Observable<Speaker[]> {
    this.speakersRef = this.db.list(this.basePath, ref => ref.orderByChild('name'));
    return this.speakers = this.speakersRef.valueChanges();
  }

  getFeaturedSpeakerList(): Observable<Speaker[]> {
    this.speakersRef = this.db.list(this.basePath, ref => ref.orderByChild('featured').equalTo(true));
    return this.speakers = this.speakersRef.valueChanges();
  }

  getSpeaker(key: string): Observable<Speaker> {
    const path = `${this.basePath}/${key}`;
    this.speakerRef = this.db.object(path);
    return this.speaker = this.speakerRef.valueChanges();
  }

  getSpeakerName(key: string): any {
    const path = `${this.basePath}/${key}/name`;
    let speakerName: string;
    this.db.object(path).snapshotChanges().subscribe(snapshot => {
      speakerName = snapshot.payload.val();
    });
    return speakerName;
  }

  createSpeaker(speaker: Speaker, file?: File): void {
    const key = this.db.list(this.basePath).push(speaker).key;
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${key}`).put(file)
        .then(snapshot => {
          speaker.photoURL = snapshot.downloadURL;
          this.db.object(this.basePath + `/${key}`).set(speaker);
        });
    } else {
      this.db.object(this.basePath + `/${key}`).set(speaker);
    }
  }

  updateSpeaker(speaker: Speaker, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${speaker.$key}`).put(file)
        .then(snapshot => {
          speaker.photoURL = snapshot.downloadURL;
          this.db.object(this.basePath + `/${speaker.$key}`).update(speaker);
        });
    } else {
      this.db.object(this.basePath + `/${speaker.$key}`).update(speaker);
    }
  }

  deleteSpeaker(key: string): void {
    this.speakersRef.remove(key)
      .then(onResolve => {
        this.firebaseStorage.ref(this.basePath + `/${key}`).delete();
      });
  }

}
