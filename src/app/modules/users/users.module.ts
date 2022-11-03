import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersLayoutComponent } from './component/users-layout/users-layout.component';
import { UsersFormComponent } from './component/users-form/users-form.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';


@NgModule({
  declarations: [
    UsersLayoutComponent,
    UsersFormComponent,
    UserListComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
