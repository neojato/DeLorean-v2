import firebase from 'firebase/app';

export class Section {
  id: string;
  title: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
