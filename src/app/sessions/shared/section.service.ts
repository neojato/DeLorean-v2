import { Section } from './section';
import { Injectable } from '@angular/core';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DataBaseHelper } from '../../helper/database.helper';

@Injectable()
export class SectionService {
  sections: AngularFireList<Section> = null;

  constructor(private db: AngularFireDatabase) { }

  getSectionList(): Observable<Section[]> {
    this.sections = this.db.list<Section>(`${firebaseConfig.devfestYear}/sections`, ref => ref.orderByChild('order'));
    return DataBaseHelper.getDataBaseList<Section>(this.sections);
  }

  createSection(section: Section): void {
    const list = this.sections;
    list.push(section);
  }

  deleteSection(key: string): void {
    const list = this.sections;
    list.remove(key);
  }
}
