import firebase from 'firebase/app';

export class Sponsor {
  id: string;
  name: string;
  websiteLink: string;
  logoURL: File;
  level: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
