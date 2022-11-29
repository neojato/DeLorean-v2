import { Injectable } from '@angular/core';
import { Speaker } from './speaker';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from '@angular/fire/database';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { DataBaseHelper } from '../../helper/database.helper';

@Injectable()
export class SpeakerService {
  private basePath: string = firebaseConfig.devfestYear + '/speakers';
  private speakers: AngularFireList<Speaker> = null;
  private speaker: AngularFireObject <Speaker> = null;
  private firebaseStorage: any;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getSpeakerList(): Observable<Speaker[]> {
    this.speakers = this.db.list(this.basePath, ref => ref.orderByChild('name'));
    return DataBaseHelper.getDataBaseList<Speaker>(this.speakers);
  }

  getSpeaker(key: string): Observable<Speaker> {
    const path = `${this.basePath}/${key}`;
    this.speaker = this.db.object(path);
    return DataBaseHelper.getDataBaseObject<Speaker>(this.speaker);
  }

  createSpeaker(speaker: Speaker, file?: File): void {
    const key = this.db.list(this.basePath).push(speaker).key;
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${key}`).put(file)
        .then(snapshot => snapshot.ref.getDownloadURL()
          .then(downloadUrl => {
            speaker.photoURL = downloadUrl;
            this.db.object(this.basePath + `/${key}`).set(speaker);
          })
        );
    } else {
      this.db.object(this.basePath + `/${key}`).set(speaker);
    }
  }

  updateSpeaker(speaker: Speaker, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${speaker.id}`).put(file)
        .then(snapshot => snapshot.ref.getDownloadURL()
          .then(downloadUrl => {
            speaker.photoURL = downloadUrl;
            this.db.object(this.basePath + `/${speaker.id}`).update(speaker);
          })
        );
    } else {
      this.db.object(this.basePath + `/${speaker.id}`).update(speaker);
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
