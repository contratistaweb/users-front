import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersLayoutComponent} from "./component/users-layout/users-layout.component";
import {UserListComponent} from "./component/user-list/user-list.component";
import {UsersFormComponent} from "./component/users-form/users-form.component";
import {UserDetailsComponent} from "./component/user-details/user-details.component";

const routes: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: 'action',
        component: UsersFormComponent
      },
      {
        path: 'details',
        component: UserDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
