import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersService} from "./services/users.service";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [UsersService]
})
export class CoreModule { }
