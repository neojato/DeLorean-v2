import * as firebase from 'firebase/app';

export class Sponsor {
  $key: string;
  name: string;
  websiteLink: string;
  logoURL: File;
  level: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
