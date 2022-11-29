import { Ticket } from './ticket';
import { AngularFireList, AngularFireObject , AngularFireDatabase } from '@angular/fire/database';
import { firebaseConfig } from './../../../../environments/firebase.config';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketService {
  private basePath: string = firebaseConfig.devfestYear + '/tickets';
  private tickets: AngularFireList<Ticket> = null;
  private ticket: AngularFireObject <Ticket> = null;

  constructor(private db: AngularFireDatabase) { }

  getTicketList(query?: object): AngularFireList<Ticket> {
    this.tickets = this.db.list(this.basePath, {
      query: query
    });
    return this.tickets;
  }

  getTicket(key: string): AngularFireObject <Ticket> {
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
