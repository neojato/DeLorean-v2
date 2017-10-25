import { Sponsor } from './sponsor';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SponsorService {
  private basePath: string = firebaseConfig.devfestYear + '/sponsors';
  private firebaseStorage: any;

  sponsorsRef: AngularFireList<Sponsor[]> = null;
  sponsors: Observable<Sponsor[]> = null;

  sponsorRef: AngularFireObject<Sponsor> = null;
  sponsor: Observable<Sponsor> = null;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getSponsorList(): Observable<Sponsor[]> {
    this.sponsorsRef = this.db.list(this.basePath);
    return this.sponsors = this.sponsorsRef.valueChanges();
  }

  getSponsor(key: string): Observable<Sponsor> {
    const path = `${this.basePath}/${key}`;
    this.sponsorRef = this.db.object(path);
    return this.sponsor = this.sponsorRef.valueChanges();
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
    this.sponsorsRef.remove(key)
      .then(onResolve => {
        this.firebaseStorage.ref(this.basePath + `/${key}`).delete();
      });
  }

}
