import { Section } from './section';
import { Injectable } from '@angular/core';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class SectionService {
  sections: FirebaseListObservable<Section[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getSectionList(query?: object, year?: string|number): FirebaseListObservable<Section[]> {
    this.sections = this.listPath({ query: query }, year);
    return this.sections;
  }

  createSection(section: Section): void {
    const list = this.listPath();
    list.push(section);
  }

  deleteSection(key: string): void {
    const list = this.listPath();
    list.remove(key);
  }

  private listPath(query?: object, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    return this.db.list(`${year}/sections`, {
      query: query
    });
  }

}
