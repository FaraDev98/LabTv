import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Homecomponent';
import { MediaDetailComponent } from './media-detail/media-detail.component';
import { MoviesDiscoverComponent } from './movies-discover/movies-discover.component';
import { LoginComponent } from './forms/login/login.component';
import { RegistrationComponent } from './forms/registration/registration.component';
import { MyListComponent } from './my-list/my-list.component';
import { FormsComponent } from './forms/forms.component';
import { CompleteListComponent } from './complete-list/complete-list.component';
import { SearchComponent } from './search/search.component';
import { ContactsComponent } from './forms/contacts/contacts.component';

const routes: Routes = [
  { path: "movies/:id", component: MediaDetailComponent },
  { path: "movies", component: MoviesDiscoverComponent },
  { path: "home", component: HomeComponent, pathMatch: "full" },
  {
    path: "forms", component: FormsComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "registration", component: RegistrationComponent },
      { path: "contacts", component: ContactsComponent }
    ]
  },
  { path: "registration", component: RegistrationComponent },
  { path: "myList", component: MyListComponent },
  { path: "all/:id", component: CompleteListComponent },
  { path: "search", component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
