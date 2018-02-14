import { Ticket } from './ticket';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { firebaseConfig } from './../../../../environments/firebase.config';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketService {
  private basePath: string = firebaseConfig.devfestYear + '/tickets';
  private tickets: FirebaseListObservable<Ticket[]> = null;
  private ticket: FirebaseObjectObservable<Ticket> = null;

  constructor(private db: AngularFireDatabase) { }

  getTicketList(query?: object): FirebaseListObservable<Ticket[]> {
    this.tickets = this.db.list(this.basePath, {
      query: query
    });
    return this.tickets;
  }

  getTicket(key: string): FirebaseObjectObservable<Ticket> {
    const path = `${this.basePath}/${key}`;
    this.ticket = this.db.object(path);
    return this.ticket;
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
