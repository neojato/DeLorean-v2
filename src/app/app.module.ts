import { SiteConfigService } from './site-config/shared/site-config.service';
import { LevelService } from './sponsors/shared/level.service';
import { SponsorService } from './sponsors/shared/sponsor.service';
import { AdminService } from './services/admin/admin.service';
import { SpeakerService } from './speakers/shared/speaker.service';
import { SectionService } from './sessions/shared/section.service';
import { SessionService } from './sessions/shared/session.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';

import { routerConfig } from './router.config';

import { firebaseConfig } from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AgmCoreModule } from '@agm/core';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { AdminComponent } from './admin/admin.component';
import { SessionListComponent } from './sessions/session-list/session-list.component';
import { SessionDetailComponent } from './sessions/session-detail/session-detail.component';
import { SessionNewComponent } from './sessions/session-new/session-new.component';
import { SessionEditComponent } from './sessions/session-edit/session-edit.component';
import { SpeakerNewComponent } from './speakers/speaker-new/speaker-new.component';
import { SpeakerEditComponent } from './speakers/speaker-edit/speaker-edit.component';
import { SpeakerListComponent } from './speakers/speaker-list/speaker-list.component';
import { SiteConfigComponent } from './site-config/site-config.component';
import { SponsorListComponent } from './sponsors/sponsor-list/sponsor-list.component';
import { SponsorNewComponent } from './sponsors/sponsor-new/sponsor-new.component';
import { SponsorEditComponent } from './sponsors/sponsor-edit/sponsor-edit.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TopMenuComponent,
    AdminComponent,
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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routerConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({ apiKey: firebaseConfig.mapsKey }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    SiteConfigService,
    AuthService,
    AuthGuard,
    AdminService,
    SessionService,
    SectionService,
    SpeakerService,
    SponsorService,
    LevelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
