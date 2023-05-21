import { Injectable } from '@angular/core';
import { User } from './model/user/user';
import { Observable } from 'rxjs';
import { Permision } from './model/user/permision';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  hostLink: string = "http://192.168.1.100:8085/";

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.hostLink + "api/v1/user")
  }

  getPermisions(): Observable<Permision[]> {
    return this.http.get<Permision[]>(this.hostLink + "api/v1/permision")
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.hostLink + "api/v1/user", user)
  }

  updateUserPermisions(user: User): Observable<User> {
    return this.http.put<User>(this.hostLink + "/api/v1/user", user)
  }
}
