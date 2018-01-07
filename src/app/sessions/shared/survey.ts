import * as firebase from 'firebase/app';

export class Survey {
  group1: number;
  group2: number;
  group3: number;
  group4: number;
  group5: number;
  group6: number;
  group7: number;
  group8: number;
  comments: string;
  speakerAvg: number;
  sessionAvg: number;
  userID: string;
  displayName: string;
  email: string;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
}
