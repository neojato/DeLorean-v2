import firebase from 'firebase/app';

export class Level {
  id: string;
  name: string;
  rank: number;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
