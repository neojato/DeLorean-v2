import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerNewComponent } from './speaker-new.component';

describe('SpeakerNewComponent', () => {
  let component: SpeakerNewComponent;
  let fixture: ComponentFixture<SpeakerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
