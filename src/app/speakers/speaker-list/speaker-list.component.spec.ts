import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerListComponent } from './speaker-list.component';

describe('SpeakerListComponent', () => {
  let component: SpeakerListComponent;
  let fixture: ComponentFixture<SpeakerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
