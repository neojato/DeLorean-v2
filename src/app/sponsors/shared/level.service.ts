import { Level } from './level';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';

@Injectable()
export class LevelService {
  private basePath: string = firebaseConfig.devfestYear + '/levels';
  levels: FirebaseListObservable<Level[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getLevelList(query?: object): FirebaseListObservable<Level[]> {
    this.levels = this.db.list(this.basePath, {
      query: query
    });
    return this.levels;
  }

  createLevel(level: Level): void {
    this.db.list(this.basePath).push(level);
  }

  deleteLevel(key: string): void {
    this.db.list(this.basePath).remove(key);
  }

}
