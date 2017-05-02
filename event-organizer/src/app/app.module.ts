import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { appRoutes } from './app.routing';

import { SocialEventService } from './_services/social-event.service';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_services/auth.guard.service';
import { GeolocationService } from './_services/geolocation.service';

import { AppComponent } from './app.component';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserEventsListComponent } from './user-events-list/user-events-list.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllEventsListComponent } from './all-events-list/all-events-list.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsCalendarComponent,
    NewEventComponent,
    LoginComponent,
    UserDashboardComponent,
    UserEventsListComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AllEventsListComponent,
    DatePickerComponent,
    LocationPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1SAKfYFsz4YRHhatbwUOZMgdVZ4AYEHw'
    })
  ],
  providers: [SocialEventService, AuthService, AuthGuard, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
