import { Injectable } from '@angular/core';
import { User } from './model/user/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  hostLink: string = "http://192.168.1.100:8085/";

  
  getUsers(): Observable<User> {
    
    let url = this.hostLink + "api/v1/user";

    return new Observable<User>((observer) => {

      var eventSourceConnection = new EventSourcePolyfill(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      eventSourceConnection.onmessage = (event: any) => {
        console.debug('Received event: ', event);
          let json = JSON.parse(event.data);

          observer.next( {
            id: json['id'],
            firstName: json['firstName'],
            lastName: json['lastName'],
            email: json['email'],
            password: json['password'],
            role: json['role'],
            keycloakId: json['keycloakId']
          })
      }
      eventSourceConnection.onerror = (err: any) => {
        console.log( "[TempORealService.eventSourceConnection.onerror] error:", err)
        eventSourceConnection.close()
      }
    })
  }

  getPermisions(): Observable<string> {
    
    let url = this.hostLink + "api/v1/user/role";

    return new Observable<string>((observer) => {

      var eventSourceConnection = new EventSourcePolyfill(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      eventSourceConnection.onmessage = (event: any) => {
        console.debug('Received event: ', event);
          let json = JSON.parse(event.data);

          observer.next(json)
      }
      eventSourceConnection.onerror = (err: any) => {
        console.log( "[TempORealService.eventSourceConnection.onerror] error:", err)
        eventSourceConnection.close()
      }
    })
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.hostLink + "api/v1/user", user)
  }

  updateUserPermisions(user: User): Observable<User> {
    return this.http.put<User>(this.hostLink + "/api/v1/user", user)
  }
}
