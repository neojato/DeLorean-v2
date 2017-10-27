import { Section } from './section';
import { Injectable } from '@angular/core';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class SectionService {
  sections: FirebaseListObservable<Section[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getSectionList(year?, query = {}): FirebaseListObservable<Section[]> {
    this.sections = this.listPath(year, { query: query });
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

  private listPath(year?: string|number, query?) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    return this.db.list(`${year}/sections`, query);
  }

}
