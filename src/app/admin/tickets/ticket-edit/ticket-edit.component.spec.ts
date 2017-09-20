import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditComponent } from './ticket-edit.component';

describe('TicketEditComponent', () => {
  let component: TicketEditComponent;
  let fixture: ComponentFixture<TicketEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
