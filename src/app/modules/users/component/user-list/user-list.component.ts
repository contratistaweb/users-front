import { Component, OnInit } from '@angular/core';
import {User} from "../../../core/interfaces/user";
import {UsersService} from "../../../core/services/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
users: User[] = [];
  constructor(private readonly usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      'next': users => this.users= users,
      'error': error => console.log(error),
    })
  }

}
