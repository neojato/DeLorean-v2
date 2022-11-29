import { Injectable } from "@angular/core";
import { AngularFireList, AngularFireObject } from "@angular/fire/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DataBaseHelper {

    static getDataBaseList<T>(list: AngularFireList<T>): Observable<T[]> {
       return list.snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    static getDataBaseObject<T>(list: AngularFireObject<T>): Observable<T> {
        return list.snapshotChanges()
             .pipe(map(this.documentToDomainObject));
     }

    static documentToDomainObject = _ => {
        const object = _.payload.val();
        if (object) object.id = _.key;
        return object;
    }
}