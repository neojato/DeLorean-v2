import { Section } from './section';
import { Injectable } from '@angular/core';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class SectionService {
  private basePath: string = firebaseConfig.devfestYear + '/sections';
  sections: FirebaseListObservable<Section[]> = null;

  constructor(private db: AngularFireDatabase) { }

  getSectionList(query = {}): FirebaseListObservable<Section[]> {
    this.sections = this.db.list(this.basePath, {
      query: query
    });
    return this.sections;
  }

  createSection(section: Section): void {
    this.db.list(this.basePath).push(section)
      .catch(error => this.handleError(error));
  }

  deleteSection(key: string): void {
    this.db.list(this.basePath).remove(key)
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.error(error);
  }

}
