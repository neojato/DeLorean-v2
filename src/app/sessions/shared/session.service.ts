import { Survey } from './survey';
import { Session } from './session';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  private basePath: string = firebaseConfig.devfestYear + '/sessions';
  sessions: FirebaseListObservable<Session[]> = null;
  session: FirebaseObjectObservable<Session> = null;

  constructor(private db: AngularFireDatabase) { }

  getSessionList(query?: object): FirebaseListObservable<Session[]> {
    this.sessions = this.db.list(this.basePath, {
      query: query
    });
    return this.sessions;
  }

  getSession(key: string): FirebaseObjectObservable<Session> {
    const path = `${this.basePath}/${key}`;
    this.session = this.db.object(path);
    return this.session;
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
