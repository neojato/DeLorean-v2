import firebase from 'firebase/app';

export class Ticket {
  id: string;
  name: string;
  price: number;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
