import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ChatbotService} from "./chatbot.service";
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { SearchComponent } from './search/search.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {CartComponent} from './cart/cart.component';
import {CartService} from "./cart.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {ToastrModule} from "ngx-toastr";
import { FooterComponent } from './footer/footer.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent,
    ClothingListComponent,
    ClothingDetailComponent,
    SearchComponent,
    NavbarComponent,
    CartComponent,
    LoginComponent,
    ProfileComponent,
    FooterComponent,
    EditComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterOutlet,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ChatbotService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
