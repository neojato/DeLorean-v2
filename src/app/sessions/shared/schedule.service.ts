import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { DataBaseHelper } from '../../helper/database.helper';
@Injectable()
export class ScheduleService {
  schedules: AngularFireList<any> = null;
  sessionSchedule: AngularFireObject<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getScheduleList(uid: string, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    
    this.schedules = this.db.list(`${year}/schedules/${uid}/`)
    return DataBaseHelper.getDataBaseList<any>(this.schedules);
  }

  getScheduleSession(uid, session, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    this.sessionSchedule = this.db.object(`${year}/schedules/${uid}/${session}/`)
    return DataBaseHelper.getDataBaseObject<any>(this.sessionSchedule);
  }

  removeFromSchedule() {
    this.sessionSchedule.remove();
  }
  
  setSchedule(schedule: any) {
    this.sessionSchedule.set(schedule);
  }
}
