import {Component, OnInit, TemplateRef} from '@angular/core';
import {User} from "../../../core/interfaces/user";
import {UsersService} from "../../../core/services/users.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
users: User[] = [];
  modalRef?: BsModalRef;
  message?: string;
  deleteId: number = 0;
  alert = {type: 'success', show: false, timeout: 3000}
  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly cookieService: CookieService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.cookieService.check('userToUpdate')?this.cookieService.delete('userToUpdate'):null;
    this.getUserList();
  }
  getUserList(){
    this.usersService.getUsers().subscribe({
      'next': users => this.users= users,
      'error': error => console.log(error),
    })
  }

  goToUpdateUser(user: User){
    this.cookieService.set('userToUpdate', JSON.stringify(user))
    this.router.navigate(['/users/action'],  {queryParams: {type: 'update'}}).then()
  }

  userDelete(id: number){
    console.log({id});
    this.usersService.userDelete(id).subscribe({
      'next': result => {
        if(result){
          this.message = 'Record was deleted!';
          this.alert.type='success'
          this.alert.show = true;
          this.deleteId = 0;
          this.getUserList()
        }
      },
      'error': error => {
        this.message = error.message
        this.alert.type='danger'
        this.alert.show = true;
        this.deleteId = 0;
      }
    })
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.deleteId = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.userDelete(this.deleteId);
    this.modalRef?.hide();
    setTimeout(()=>{},2000)
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
    setTimeout(()=>{},2000)
  }
}
