import { Ticket } from './ticket';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { firebaseConfig } from './../../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TicketService {
  private basePath: string = firebaseConfig.devfestYear + '/tickets';

  ticketsRef: AngularFireList<Ticket[]> = null;
  tickets: Observable<Ticket[]> = null;

  ticketRef: AngularFireObject<Ticket> = null;
  ticket: Observable<Ticket> = null;

  constructor(private db: AngularFireDatabase) { }

  getTicketList(): Observable<Ticket[]> {
    this.ticketsRef = this.db.list(this.basePath, ref => ref.orderByChild('active').equalTo(true));
    return this.tickets = this.ticketsRef.valueChanges();
  }

  getTicket(key: string): Observable<Ticket> {
    const path = `${this.basePath}/${key}`;
    this.ticketRef = this.db.object(path);
    return this.ticket = this.ticketRef.valueChanges();
  }

  createTicket(ticket): void {
    this.ticketsRef.push(ticket);
  }

  updateTicket(key: string, value: any): void {
    this.ticketsRef.update(key, value);
  }

  deleteTicket(key: string): void {
    this.ticketsRef.remove(key);
  }

}
