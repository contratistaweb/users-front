import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../core/services/users.service";
import {CookieService} from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit, AfterViewInit {

  action: string = '';
  userForm!: FormGroup;
  userToUpdate!: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly cookieService: CookieService,
    private readonly fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.nonNullable.group({
      age: new FormControl(),
      email: new FormControl(),
      firstname: new FormControl(),
      lastname: new FormControl(),
      phone: new FormControl()
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      'next': queries => {
        this.action = queries['type'];
        this.getUserToUpdate();
      }
    })

  }

  ngAfterViewInit(): void {
    if (this.action === 'update') {
      this.userForm.patchValue({...this.userToUpdate});
    }else{
      this.userForm.addControl('email', ['', Validators.email])
    }
  }

  getUserToUpdate() {
    if (this.cookieService.check('userToUpdate')) {
      this.userToUpdate = JSON.parse(this.cookieService.get('userToUpdate'));
      console.log('userToUpdate antes => ', this.userToUpdate);
    }
  }

  newUser() {
    if(this.userForm.valid){
    console.log(this.userForm.value);
    }
  }

  updateUser() {
    if (this.cookieService.check('userToUpdate')) {
      console.log('userToUpdate antes => ', this.userToUpdate)
      const formKeys = Object.keys(this.userForm.value);
      let changes: any = {};
      formKeys.forEach((formKey: string) => {
        if (this.userForm.controls[formKey].value !== this.userToUpdate[formKey]) {
          changes = {...changes, [formKey]: this.userForm.controls[formKey].value}
        }
      })
      this.usersService.updateUser(this.userToUpdate.id, changes).subscribe({
        'next': result => {
          if (result) {
            this.toastr.success('record updated successfully', 'Success')
            this.router.navigate(['/users']).then()
          }
        }
      })
    }
  }

  actionExecute() {
    if (this.action === 'create') {
      this.newUser()
    } else if (this.action === 'update') {
      this.updateUser()
    } else {
      this.router.navigate(['/users']).then()
    }
  }


}
