import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './modules/core/shared/componentes/main-layout/main-layout.component';
import { CopyrightComponent } from './modules/core/shared/componentes/copyright/copyright.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
