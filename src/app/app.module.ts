import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
