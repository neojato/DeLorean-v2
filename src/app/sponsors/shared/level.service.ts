import { Level } from './level';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LevelService {
  private basePath: string = firebaseConfig.devfestYear + '/levels';

  levelsRef: AngularFireList<Level[]> = null;
  levels: Observable<Level[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getLevelList(): Observable<Level[]> {
    this.levelsRef = this.db.list(this.basePath, ref => ref.orderByChild('rank'));
    return this.levels = this.levelsRef.valueChanges();
  }

  createLevel(level): void {
    this.levelsRef.push(level);
  }

  deleteLevel(key: string): void {
    this.levelsRef.remove(key);
  }

}
