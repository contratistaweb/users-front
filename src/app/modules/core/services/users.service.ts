import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {User, UserCreate, UserUpdate} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
apiUrl = environment.apiUrl+':'+environment.apiPort
  constructor(private readonly http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  addUser(user: UserCreate){
    return this.http.post<User[]>(`${this.apiUrl}/users`, user)
  }

  updateUser(id: number, changes: UserUpdate) {
    return this.http.patch(`${this.apiUrl}/users/${id}`, changes);
  }

  userDelete(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
