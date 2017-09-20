import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorEditComponent } from './sponsor-edit.component';

describe('SponsorEditComponent', () => {
  let component: SponsorEditComponent;
  let fixture: ComponentFixture<SponsorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
