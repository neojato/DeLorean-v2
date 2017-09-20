import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from './../../shared/ticket/ticket.service';
import { Ticket } from './../../shared/ticket/ticket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent implements OnInit {
  ticket: Ticket = new Ticket();
  activeKey: string;

  constructor(
    private ticketService: TicketService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.ticketService.getTicket(this.activeKey).subscribe(ticket => {
        this.ticket = ticket;
      });
    });
  }

  update() {
    this.ticketService.updateTicket(this.activeKey, this.ticket);
    this.ticket = new Ticket();
    this.router.navigate(['/tickets']);
  }

}
