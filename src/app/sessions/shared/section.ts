import * as firebase from 'firebase/app';

export class Section {
  $key: string;
  title: string;
  rank: number;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
