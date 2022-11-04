import { Component, OnInit } from '@angular/core';
import {User} from "../../../core/interfaces/user";
import {UsersService} from "../../../core/services/users.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
users: User[] = [];
  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.cookieService.check('userToUpdate')?this.cookieService.delete('userToUpdate'):null;
    this.usersService.getUsers().subscribe({
      'next': users => this.users= users,
      'error': error => console.log(error),
    })
  }

  goToUpdateUser(user: User){
    this.cookieService.set('userToUpdate', JSON.stringify(user))
    this.router.navigate(['/users/action'],  {queryParams: {type: 'update'}}).then()
  }

}
