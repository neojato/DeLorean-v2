import { Level } from './level';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';

@Injectable()
export class LevelService {
  private basePath: string = '/' + firebaseConfig.devfestYear + '/levels';
  levels: FirebaseListObservable<Level[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getLevelList(query = {}): FirebaseListObservable<Level[]> {
    this.levels = this.db.list(this.basePath, {
      query: query
    });
    return this.levels;
  }

  createLevel(level: Level): void {
    this.db.list(this.basePath).push(level)
      .catch(error => this.handleError(error));
  }

  deleteLevel(key: string): void {
    this.db.list(this.basePath).remove(key)
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.error(error);
  }

}
