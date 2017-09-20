import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNewComponent } from './ticket-new.component';

describe('TicketNewComponent', () => {
  let component: TicketNewComponent;
  let fixture: ComponentFixture<TicketNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
