import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionNewComponent } from './session-new.component';

describe('SessionNewComponent', () => {
  let component: SessionNewComponent;
  let fixture: ComponentFixture<SessionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
