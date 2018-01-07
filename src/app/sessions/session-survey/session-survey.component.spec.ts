import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSurveyComponent } from './session-survey.component';

describe('SessionSurveyComponent', () => {
  let component: SessionSurveyComponent;
  let fixture: ComponentFixture<SessionSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
