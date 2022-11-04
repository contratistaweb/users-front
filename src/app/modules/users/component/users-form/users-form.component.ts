import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../../core/services/users.service";
import {CookieService} from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../core/interfaces/user";

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
        if (this.action === 'update') {
          this.getUserToUpdate();
        }
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.action === 'update') this.userForm.patchValue({...this.userToUpdate});
    if (this.action==='create') this.createUserForm();
  }

  createUserForm() {
    if (this.action === 'create') {
      this.userForm = this.fb.nonNullable.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required, Validators.maxLength(45)]],
        age: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.maxLength(255)]],
        phone: ['', [Validators.required, Validators.maxLength(45)]],
      })
    }

  }


  getUserToUpdate() {
    if (this.cookieService.check('userToUpdate')) {
      this.userToUpdate = JSON.parse(this.cookieService.get('userToUpdate'));
    }
  }

  newUser() {
    if (this.userForm.valid) {
      this.usersService.addUser(this.userForm.value).subscribe({
        'next': result => {
          if(result){
            this.toastr.success('record create successfully.', 'Success')
            this.router.navigate(['/users']).then()
          }
        },
        'error': error => {
          this.toastr.error(`${error.message}`, 'Error')
        }
      })
    }
  }

  updateUser() {
    if (this.cookieService.check('userToUpdate')) {
      const formKeys = Object.keys(this.userForm.value);
      let changes: any = {};
      let newChanges = false;
      formKeys.forEach((formKey: string) => {
        if (this.userForm.controls[formKey].value !== this.userToUpdate[formKey]) {
          changes = {...changes, [formKey]: this.userForm.controls[formKey].value}
          newChanges = true;
        }
      })
      if(newChanges){
        this.usersService.updateUser(this.userToUpdate.id, changes).subscribe({
          'next': result => {
            if (result) {
              this.toastr.success('record updated successfully.', 'Success')
              this.router.navigate(['/users']).then()
            }
          },
          'error': error => {
            this.toastr.error(`${error.message}`, 'Error')
          }
        })
      }else{
        this.toastr.info(`No changes have been made yet.`, 'Info')
      }

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
