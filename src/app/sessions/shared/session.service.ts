import { Survey } from './survey';
import { Session } from './session';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList, AngularFireObject  } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseHelper } from '../../helper/database.helper';

@Injectable()
export class SessionService {
  private basePath: string = firebaseConfig.devfestYear + '/sessions';
  sessions: AngularFireList<Session> = null;
  session: AngularFireObject <Session> = null;

  constructor(private db: AngularFireDatabase) { }

  getSessionList(): Observable<Session[]> {
    this.sessions = this.db.list(this.basePath, ref => ref.orderByChild('time'));
    return DataBaseHelper.getDataBaseList<Session>(this.sessions);
  }

  getSession(key: string): Observable<Session> {
    this.session = this.db.object(`${this.basePath}/${key}`);
    return DataBaseHelper.getDataBaseObject<Session>(this.session);
  }

  createSession(session: Session): void {
    this.sessions.push(session);
  }

  updateSession(key: string, value: any): void {
    this.sessions.update(key, value);
  }

  deleteSession(key: string): void {
    this.sessions.remove(key);
  }

  saveSurvey(key: string, survey: Survey): void {
    const path = `${this.basePath}/${key}/surveys`;
    const surveys = this.db.list(path);
    surveys.push(survey);
  }

}
