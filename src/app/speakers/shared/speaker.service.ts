import { Injectable } from '@angular/core';
import { Speaker } from './speaker';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class SpeakerService {
  private basePath: string = firebaseConfig.devfestYear + '/speakers';
  private speakers: FirebaseListObservable<Speaker[]> = null;
  private speaker: FirebaseObjectObservable<Speaker> = null;
  private firebaseStorage: any;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getSpeakerList(query?: object): FirebaseListObservable<Speaker[]> {
    this.speakers = this.db.list(this.basePath, {
      query: query
    });
    return this.speakers;
  }

  getSpeaker(key: string): FirebaseObjectObservable<Speaker> {
    const path = `${this.basePath}/${key}`;
    this.speaker = this.db.object(path);
    return this.speaker;
  }

  getSpeakerName(key: string): any {
    const path = `${this.basePath}/${key}/name`;
    let speakerName: string;
    this.db.object(path).subscribe(snapshot => {
      speakerName = snapshot.$value;
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
    this.speakers.remove(key)
      .then(onResolve => {
        this.firebaseStorage.ref(this.basePath + `/${key}`).delete();
      })
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.error(error);
  }

}
