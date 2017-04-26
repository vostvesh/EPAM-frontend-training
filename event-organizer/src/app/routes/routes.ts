import { Routes } from '@angular/router';
import { LoginComponent } from "app/login/login.component";
import { UserDashboardComponent } from "app/user-dashboard/user-dashboard.component";
import { EventsCalendarComponent } from "app/events-calendar/events-calendar.component";
import { NewEventComponent } from "app/new-event/new-event.component";

export const appRoutes: Routes = [
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'events-calendar', component: EventsCalendarComponent },
  { path: 'new-event', component: NewEventComponent }
];