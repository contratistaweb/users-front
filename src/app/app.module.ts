import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './modules/core/shared/componentes/main-layout/main-layout.component';
import { CopyrightComponent } from './modules/core/shared/componentes/copyright/copyright.component';
import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {ModalModule} from "ngx-bootstrap/modal";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [CookieService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
