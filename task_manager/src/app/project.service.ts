import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './model/project/project';
import { Observable } from 'rxjs';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  hostLink: string = "http://192.168.1.100:8085/"

  constructor(private http: HttpClient) { }
  
  getProjects() : Observable<Project> {

    var url = this.hostLink + "api/v1/project"

    return new Observable<Project>((observer) => {

      var eventSourceConnection = new EventSourcePolyfill(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      eventSourceConnection.onopen = () => {
        console.log(
          "[RealtimeService.onOpenConnection] SSE connection established!"
        )
      }

      eventSourceConnection.onmessage = (event: any) => {
        console.debug('Received event: ', event);
          let json = JSON.parse(event.data);

          observer.next(  {
            id: json['id'],
            name: json['name'],
            description: json['description'],
            startDate: json['startDate'],
            status: json['status']
          })
      }

      eventSourceConnection.onerror = (err: any) => {
        console.log( "[TempORealService.eventSourceConnection.onerror] error:", err)
        eventSourceConnection.close()
      }
    })
  }


  getProjectById(id: number): Observable<Project> {
    
    var url = this.hostLink + "api/v1/project/" + id
    return new Observable<Project>((observer) => {

      var eventSourceConnection = new EventSourcePolyfill(url, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })

      eventSourceConnection.onmessage = (event: any) => {
        console.debug('Received event: ', event);
          let json = JSON.parse(event.data);

          observer.next(  {
            id: json['id'],
            name: json['name'],
            description: json['description'],
            startDate: json['startDate'],
            status: json['status']
          })
      }
      eventSourceConnection.onerror = (err: any) => {
        console.log( "[TempORealService.eventSourceConnection.onerror] error:", err)
        eventSourceConnection.close()
      }
    })
  }
  
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.hostLink + "api/v1/project", project) 
  }
}
