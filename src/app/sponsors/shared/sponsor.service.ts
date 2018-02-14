import { Sponsor } from './sponsor';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class SponsorService {
  private basePath: string = firebaseConfig.devfestYear + '/sponsors';
  private sponsors: FirebaseListObservable<Sponsor[]> = null;
  private sponsor: FirebaseObjectObservable<Sponsor> = null;
  private firebaseStorage: any;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getSponsorList(query?: object): FirebaseListObservable<Sponsor[]> {
    this.sponsors = this.db.list(this.basePath, {
      query: query
    });
    return this.sponsors;
  }

  getSponsor(key: string): FirebaseObjectObservable<Sponsor> {
    const path = `${this.basePath}/${key}`;
    this.sponsor = this.db.object(path);
    return this.sponsor;
  }

  createSponsor(sponsor: Sponsor, file?: File): void {
    const key = this.db.list(this.basePath).push(sponsor).key;
    if (file) {
      this.firebaseStorage.ref(this.basePath + `/${key}`).put(file)
        .then(snapshot => {
          sponsor.logoURL = snapshot.downloadURL;
          this.db.object(this.basePath + `/${key}`).set(sponsor);
        });
    }
  }

  updateSponsor(sponsor: Sponsor, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${sponsor.$key}`).put(file)
        .then(snapshot => {
          sponsor.logoURL = snapshot.downloadURL;
          this.db.object(this.basePath + `/${sponsor.$key}`).update(sponsor);
        });
    } else {
      this.db.object(this.basePath + `/${sponsor.$key}`).update(sponsor);
    }
  }

  deleteSponsor(key: string): void {
    this.sponsors.remove(key)
      .then(onResolve => {
        this.firebaseStorage.ref(this.basePath + `/${key}`).delete();
      })
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.error(error);
  }

}
