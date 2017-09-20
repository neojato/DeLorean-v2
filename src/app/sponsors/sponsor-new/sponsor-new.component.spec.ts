import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorNewComponent } from './sponsor-new.component';

describe('SponsorNewComponent', () => {
  let component: SponsorNewComponent;
  let fixture: ComponentFixture<SponsorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
