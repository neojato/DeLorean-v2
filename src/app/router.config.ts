import { CocComponent } from './coc/coc.component';
import { SurveysComponent } from './admin/surveys/surveys.component';
import { SessionSurveyComponent } from './sessions/session-survey/session-survey.component';
import { MyScheduleComponent } from './sessions/my-schedule/my-schedule.component';
import { TicketListComponent } from './admin/tickets/ticket-list/ticket-list.component';
import { TicketEditComponent } from './admin/tickets/ticket-edit/ticket-edit.component';
import { TicketNewComponent } from './admin/tickets/ticket-new/ticket-new.component';
import { SiteConfigComponent } from './admin/site-config/site-config.component';
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
import { UsersComponent } from './admin/users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

export const routerConfig: Route[] = [{
  path: 'home',
  component: HomeComponent
}, {
  path: 'admin',
  children: [{
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: { title: 'User Admin' }
  }, {
    path: 'config',
    component: SiteConfigComponent,
    canActivate: [AuthGuard],
    data: { title: 'Site Config' }
  }, {
    path: 'surveys',
    component: SurveysComponent,
    canActivate: [AuthGuard],
    data: { title: 'Survey Data' }
  }, {
    path: 'tickets',
    children: [{
      path: 'new',
      component: TicketNewComponent,
      canActivate: [AuthGuard],
      data: { title: 'New Ticket' }
    }, {
      path: ':id',
      children: [{
        path: 'edit',
        component: TicketEditComponent,
        canActivate: [AuthGuard],
        data: { title: 'Edit Ticket' }
      }]
    }, {
      path: '',
      component: TicketListComponent,
      data: { title: 'Tickets' }
    }]
  }]
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard],
  data: { title: 'My Profile' }
}, {
  path: 'my-schedule',
  component: MyScheduleComponent,
  canActivate: [AuthGuard],
  data: { title: 'My Schedule' }
}, {
  path: 'sessions',
  children: [{
    path: 'new',
    component: SessionNewComponent,
    canActivate: [AuthGuard],
    data: { title: 'New Session' }
  }, {
    path: ':id',
    children: [{
      path: '',
      component: SessionDetailComponent,
      data: { title: 'Session Details' }
    }, {
      path: 'edit',
      component: SessionEditComponent,
      canActivate: [AuthGuard],
      data: { title: 'Edit Session' }
    }, {
      path: 'survey',
      component: SessionSurveyComponent,
      canActivate: [AuthGuard],
      data: { title: 'Session Survey' }
    }]
  }, {
    path: '',
    component: SessionListComponent,
    data: {
      title: 'Schedule',
      preload: true
    }
  }]
}, {
  path: 'speakers',
  children: [{
    path: 'new',
    component: SpeakerNewComponent,
    canActivate: [AuthGuard],
    data: { title: 'New Speaker' }
  }, {
    path: ':id',
    children: [{
      path: 'edit',
      component: SpeakerEditComponent,
      canActivate: [AuthGuard],
      data: { title: 'Edit Speaker' }
    }]
  }, {
    path: '',
    component: SpeakerListComponent,
    data: {
      title: 'Speakers',
      preload: true
    }
  }]
}, {
  path: 'sponsors',
  children: [{
    path: 'new',
    component: SponsorNewComponent,
    canActivate: [AuthGuard],
    data: { title: 'New Sponsor' }
  }, {
    path: ':id',
    children: [{
      path: 'edit',
      component: SponsorEditComponent,
      canActivate: [AuthGuard],
      data: { title: 'Edit Sponsor' }
    }]
  }, {
    path: '',
    component: SponsorListComponent,
    data: { title: 'Sponsors' }
  }]
}, {
  path: 'code-of-conduct',
  component: CocComponent,
  data: { title: 'Code of Conduct' }
}, {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: 'home'
}];
