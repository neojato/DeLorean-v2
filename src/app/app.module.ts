import { ScheduleService } from './sessions/shared/schedule.service';
import { TicketService } from './admin/shared/ticket/ticket.service';
import { SiteConfigService } from './admin/shared/site-config/site-config.service';
import { GeocoderApiService } from './services/geocoder-api/geocoder-api.service';
import { LevelService } from './sponsors/shared/level.service';
import { SponsorService } from './sponsors/shared/sponsor.service';
import { UserService } from './admin/shared/user/user.service';
import { SpeakerService } from './speakers/shared/speaker.service';
import { SectionService } from './sessions/shared/section.service';
import { SessionService } from './sessions/shared/session.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppCustomPreloader } from './app.custompreloader';
import { AppComponent } from './app.component';

import { routerConfig } from './router.config';

import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { UsersComponent } from './admin/users/users.component';
import { SessionListComponent } from './sessions/session-list/session-list.component';
import { SessionDetailComponent } from './sessions/session-detail/session-detail.component';
import { SessionNewComponent } from './sessions/session-new/session-new.component';
import { SessionEditComponent } from './sessions/session-edit/session-edit.component';
import { SpeakerNewComponent } from './speakers/speaker-new/speaker-new.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { SpeakerListComponent } from './speakers/speaker-list/speaker-list.component';
import { SiteConfigComponent } from './admin/site-config/site-config.component';
import { SponsorListComponent } from './sponsors/sponsor-list/sponsor-list.component';
import { SponsorNewComponent } from './sponsors/sponsor-new/sponsor-new.component';
import { SponsorEditComponent } from './sponsors/sponsor-edit/sponsor-edit.component';
import { FooterComponent } from './footer/footer.component';
import { TicketNewComponent } from './admin/tickets/ticket-new/ticket-new.component';
import { TicketEditComponent } from './admin/tickets/ticket-edit/ticket-edit.component';
import { TicketListComponent } from './admin/tickets/ticket-list/ticket-list.component';
import { MyScheduleComponent } from './sessions/my-schedule/my-schedule.component';
import { SessionSurveyComponent } from './sessions/session-survey/session-survey.component';
import { SurveysComponent } from './admin/surveys/surveys.component';
import { KeysPipe } from './pipes/keys.pipe';
import { CocComponent } from './coc/coc.component';

@NgModule({
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TopMenuComponent,
    UsersComponent,
    SessionListComponent,
    SessionDetailComponent,
    SessionNewComponent,
    SessionEditComponent,
    SpeakerNewComponent,
    SpeakerEditComponent,
    SpeakerListComponent,
    SiteConfigComponent,
    SponsorListComponent,
    SponsorNewComponent,
    SponsorEditComponent,
    FooterComponent,
    UsersComponent,
    TicketNewComponent,
    TicketEditComponent,
    TicketListComponent,
    MyScheduleComponent,
    SessionSurveyComponent,
    SurveysComponent,
    KeysPipe,
    CocComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routerConfig, { preloadingStrategy: AppCustomPreloader }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({ apiKey: firebaseConfig.mapsKey }),
    MDBBootstrapModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  providers: [
    SiteConfigService,
    AuthService,
    AuthGuard,
    UserService,
    SessionService,
    SectionService,
    SpeakerService,
    SponsorService,
    LevelService,
    GeocoderApiService,
    TicketService,
    ScheduleService,
    AppCustomPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
