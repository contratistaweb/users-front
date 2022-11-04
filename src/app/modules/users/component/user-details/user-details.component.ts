import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/interfaces/user";
import {UsersService} from "../../../core/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId: number = 0;
  user!: User;

  constructor(
    private readonly cookieService: CookieService,
    private readonly usersService: UsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      'next': queries => {
        this.userId = queries['id']
        this.getUser(this.userId);
      }
    })
  }

  getUser(id: number) {
    this.usersService.getUserForId(id).subscribe({
      'next': result => {
        if (result) {
          this.user = result[0];
        }
      }
    })
  }
  goToUpdateUser(user: User){
    this.cookieService.set('userToUpdate', JSON.stringify(user))
    this.router.navigate(['/users/action'],  {queryParams: {type: 'update'}}).then()
  }
}
