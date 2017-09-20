import { SiteConfig } from './site-config';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class SiteConfigService {
  private basePath: string = '/' + firebaseConfig.devfestYear + '/siteConfig';
  private siteConfig: FirebaseObjectObservable<SiteConfig> = null;
  private firebaseStorage: any;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
    // beware ... there's a hack ahead that inits the "key" for siteConfig
    this.db.object(this.basePath).update({ hello: 'world' });
  }

  getConfig(): FirebaseObjectObservable<SiteConfig> {
    this.siteConfig = this.db.object(this.basePath);
    return this.siteConfig;
  }

  createConfig(siteConfig: SiteConfig, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + '/venuePhoto').put(file)
        .then(snapshot => {
          siteConfig.venuePhoto = snapshot.downloadURL;
          this.db.object(this.basePath).set(siteConfig);
        });
    } else {
      this.db.object(this.basePath).set(siteConfig);
    }
  }

  updateConfig(siteConfig: SiteConfig, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + '/venuePhoto').put(file)
        .then(snapshot => {
          siteConfig.venuePhoto = snapshot.downloadURL;
          this.db.object(this.basePath).update(siteConfig);
        });
    } else {
      this.db.object(this.basePath).update(siteConfig);
    }
  }

}
