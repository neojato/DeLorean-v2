import { SponsorListComponent } from './sponsors/sponsor-list/sponsor-list.component';
import { SponsorEditComponent } from './sponsors/sponsor-edit/sponsor-edit.component';
import { SponsorNewComponent } from './sponsors/sponsor-new/sponsor-new.component';
import { SpeakerListComponent } from './speakers/speaker-list/speaker-list.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { SpeakerNewComponent } from './speakers/speaker-new/speaker-new.component';
import { SessionEditComponent } from './sessions/session-edit/session-edit.component';
import { SessionNewComponent } from './sessions/session-new/session-new.component';
import { SessionListComponent } from './sessions/session-list/session-list.component';
import { SessionDetailComponent } from './sessions/session-detail/session-detail.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

export const routerConfig: Route[] = [{
  path: 'home',
  component: HomeComponent
}, {
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard]
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
}, {
  path: 'sessions',
  children: [{
    path: 'new',
    component: SessionNewComponent
  }, {
    path: ':id',
    children: [{
      path: '',
      component: SessionDetailComponent
    }, {
      path: 'edit',
      component: SessionEditComponent
    }]
  }, {
    path: '',
    component: SessionListComponent
  }]
}, {
  path: 'speakers',
  children: [{
    path: 'new',
    component: SpeakerNewComponent
  }, {
    path: ':id',
    children: [{
      path: 'edit',
      component: SpeakerEditComponent
    }]
  }, {
    path: '',
    component: SpeakerListComponent
  }]
}, {
  path: 'sponsors',
  children: [{
    path: 'new',
    component: SponsorNewComponent
  }, {
    path: ':id',
    children: [{
      path: 'edit',
      component: SponsorEditComponent
    }]
  }, {
    path: '',
    component: SponsorListComponent
  }]
}, {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: 'home'
}];
