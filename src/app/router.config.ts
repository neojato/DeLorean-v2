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
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: 'home'
}];
