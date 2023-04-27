import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { DomSanitizer } from "@angular/platform-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Homecomponent';
import { ListaMediaComponent } from './lista-media/lista-media.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MediaPreviewComponent } from './media-preview/media-preview.component';
import { MenuCollapsableComponent } from './header/menu-collapsable/menu-collapsable.component';
import { TitleBarComponent } from './header/title-bar/title-bar.component';
import { UtilitiesComponent } from './header/utilities/utilities.component';
import { SocialBarComponent } from './social-bar/social-bar.component';
import { ScoreComponent } from './score/score.component';
import { MediaDetailComponent } from './media-detail/media-detail.component';
import { CastListComponent } from './cast-list/cast-list.component';
import { CastPreviewComponent } from './cast-preview/cast-preview.component';
import { LoaderComponent } from './loader/loader.component';
import { VideoComponent } from './video/video.component';
import { SimilarListComponent } from './similar-list/similar-list.component';
import { GenresPreviewComponent } from './genres-preview/genres-preview.component';
import { MoviesDiscoverComponent } from './movies-discover/movies-discover.component';
import { LoginComponent } from './forms/login/login.component';
import { RegistrationComponent } from './forms/registration/registration.component';
import { MyListComponent } from './my-list/my-list.component';
import { SingleTitleComponent } from './my-list/single-title/single-title.component';
import { FormsComponent } from './forms/forms.component';
import { ShowAllComponent } from './show-all/show-all.component';
import { CompleteListComponent } from './complete-list/complete-list.component';
import { SearchComponent } from './search/search.component';
import { ContactsComponent } from './forms/contacts/contacts.component';

@Pipe({

  name: 'safe'

})

export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url: string) {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaMediaComponent,
    HeaderComponent,
    FooterComponent,
    MediaPreviewComponent,
    MenuCollapsableComponent,
    TitleBarComponent,
    UtilitiesComponent,
    SocialBarComponent,
    ScoreComponent,
    MediaDetailComponent,
    CastListComponent,
    CastPreviewComponent,
    LoaderComponent,
    VideoComponent,
    SafePipe,
    SimilarListComponent,
    GenresPreviewComponent,
    MoviesDiscoverComponent,
    LoginComponent,
    RegistrationComponent,
    MyListComponent,
    SingleTitleComponent,
    FormsComponent,
    ShowAllComponent,
    CompleteListComponent,
    SearchComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


