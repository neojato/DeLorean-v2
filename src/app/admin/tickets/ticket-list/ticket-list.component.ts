import { AngularFireList } from '@angular/fire/database';
import { TicketService } from './../../shared/ticket/ticket.service';
import { Ticket } from './../../shared/ticket/ticket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: AngularFireList<Ticket>;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.tickets = this.ticketService.getTicketList();
  }

  delete(key: string) {
    this.ticketService.deleteTicket(key);
  }

}
