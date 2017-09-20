import { Router } from '@angular/router';
import { TicketService } from './../../shared/ticket/ticket.service';
import { Ticket } from './../../shared/ticket/ticket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.scss']
})
export class TicketNewComponent implements OnInit {
  ticket: Ticket = new Ticket();

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() { }

  save() {
    this.ticketService.createTicket(this.ticket);
    this.ticket = new Ticket();
    this.router.navigate(['/tickets']);
  }

}
