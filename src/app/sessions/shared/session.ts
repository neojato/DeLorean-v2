import * as firebase from 'firebase/app';

export class Session {
  $key: string;
  title: string;
  room: string;
  time: string;
  section: string;
  abstract: string;
  speakers: any;
  tag: string;
  level: string;
  rank: number;
  surveys: any;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
