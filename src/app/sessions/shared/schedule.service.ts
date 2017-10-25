import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScheduleService {
  schedulesRef: AngularFireList<any[]> = null;
  schedules: Observable<any[]> = null;

  scheduleRef: AngularFireObject<any> = null;
  schedule: Observable<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getScheduleList(uid, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    const path = `${year}/schedules/${uid}/`;
    this.schedulesRef = this.db.list(path);
    return this.schedules = this.schedulesRef.valueChanges();
  }

  getScheduleSession(uid, session, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    const path = `${year}/schedules/${uid}/${session}/`;
    this.scheduleRef = this.db.object(path);
    return this.schedule = this.scheduleRef.valueChanges();
  }

  saveScheduleSession(uid, session, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    const path = `${year}/schedules/${uid}/`;
    this.schedulesRef = this.db.list(path);
    this.schedulesRef.push(session);
  }

  removeScheduleSession(uid, sessionId, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    const path = `${year}/schedules/${uid}/${sessionId}/`;
    this.schedulesRef = this.db.list(path);
  }

}
