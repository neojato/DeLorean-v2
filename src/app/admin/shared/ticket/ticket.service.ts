import { Ticket } from './ticket';
import { AngularFireList, AngularFireObject , AngularFireDatabase } from '@angular/fire/database';
import { firebaseConfig } from './../../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseHelper } from '../../../helper/database.helper';

@Injectable()
export class TicketService {
  private basePath: string = firebaseConfig.devfestYear + '/tickets';
  private tickets: AngularFireList<Ticket> = null;
  private ticket: AngularFireObject<Ticket> = null;

  constructor(private db: AngularFireDatabase) { }

  getTicketList(): Observable<Ticket[]> {
    this.tickets = this.db.list(this.basePath, ref => ref);
    return DataBaseHelper.getDataBaseList<Ticket>(this.tickets);
  }

  getTicket(key: string): Observable<Ticket> {
    const path = `${this.basePath}/${key}`;
    this.ticket = this.db.object(path);
    return DataBaseHelper.getDataBaseObject<any>(this.ticket);
  }

  createTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
  }

  updateTicket(key: string, value: any): void {
    this.tickets.update(key, value);
  }

  deleteTicket(key: string): void {
    this.tickets.remove(key);
  }

}
