import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersLayoutComponent } from './component/users-layout/users-layout.component';
import { UsersFormComponent } from './component/users-form/users-form.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import {CoreModule} from "../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";


@NgModule({
  declarations: [
    UsersLayoutComponent,
    UsersFormComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AlertModule
  ],
  providers: []
})
export class UsersModule { }
