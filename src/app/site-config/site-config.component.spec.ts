import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteConfigComponent } from './site-config.component';

describe('SiteConfigComponent', () => {
  let component: SiteConfigComponent;
  let fixture: ComponentFixture<SiteConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
