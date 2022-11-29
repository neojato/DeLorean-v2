import { TicketService } from './../../shared/ticket/ticket.service';
import { Ticket } from './../../shared/ticket/ticket';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Observable<Ticket[]>;

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.tickets = this.ticketService.getTicketList();
  }

  delete(key: string) {
    this.ticketService.deleteTicket(key);
  }

}
