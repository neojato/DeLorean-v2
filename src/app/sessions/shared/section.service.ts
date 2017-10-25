import { Section } from './section';
import { Injectable } from '@angular/core';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SectionService {
  sectionsRef: AngularFireList<Section[]> = null;
  sections: Observable<Section[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getSectionList(year?): Observable<Section[]> {
    this.sections = this.listPath(year).valueChanges();
    return this.sections;
  }

  createSection(section): void {
    this.sectionsRef.push(section);
  }

  deleteSection(key: string): void {
    this.sectionsRef.remove(key);
  }

  private listPath(year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    return this.sectionsRef = this.db.list(`${year}/sections`);
  }

}
