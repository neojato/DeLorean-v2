import firebase from 'firebase/app';

export class Session {
  id: string;
  title: string;
  room: string;
  time: string;
  section: string;
  abstract: string;
  speakers: any;
  tag: string;
  level: string;
  surveys: any;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
