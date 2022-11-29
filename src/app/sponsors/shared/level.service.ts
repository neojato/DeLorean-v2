import { Level } from './level';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseHelper } from '../../helper/database.helper';

@Injectable()
export class LevelService {
  private basePath: string = firebaseConfig.devfestYear + '/levels';
  levels: AngularFireList<Level> = null;

  constructor(private db: AngularFireDatabase) { }

  getLevelList(): Observable<Level[]> {
    this.levels = this.db.list(this.basePath, ref => ref.orderByChild('rank'));
    return DataBaseHelper.getDataBaseList<Level>(this.levels);
  }

  createLevel(level: Level): void {
    this.db.list(this.basePath).push(level);
  }

  deleteLevel(key: string): void {
    this.db.list(this.basePath).remove(key);
  }

}
