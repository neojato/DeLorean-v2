import { Session } from './session';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionService {
  private basePath: string = firebaseConfig.devfestYear + '/sessions';

  sessionsRef: AngularFireList<Session[]> = null;
  sessions: Observable<Session[]> = null;

  sessionRef: AngularFireObject<Session> = null;
  session: Observable<Session> = null;

  constructor(private db: AngularFireDatabase) { }

  getSessionList(): Observable<Session[]> {
    this.sessionsRef = this.db.list(this.basePath);
    return this.sessions = this.sessionsRef.valueChanges();
  }

  getSession(key: string): Observable<Session> {
    const path = `${this.basePath}/${key}`;
    this.sessionRef = this.db.object(path);
    return this.session = this.sessionRef.valueChanges();
  }

  createSession(session): void {
    this.sessionsRef.push(session);
  }

  updateSession(key: string, value: any): void {
    this.sessionsRef.update(key, value);
  }

  deleteSession(key: string): void {
    this.sessionsRef.remove(key);
  }

}
