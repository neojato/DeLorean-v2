import * as firebase from 'firebase/app';

export class Level {
  $key: string;
  name: string;
  rank: number;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
