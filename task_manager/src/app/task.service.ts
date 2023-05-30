import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './model/task/task';
import { Project } from './model/project/project';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  hostLink: string = "http://192.168.1.100:8085/";

  
  getTasksByProjectId(projectId: number): Observable<Task> {

    let url = this.hostLink + 'api/v1/project/' + projectId + "/task";

    return new Observable<Task>((observer) => {

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

          observer.next( {
            id: json['id'],
            header: json['header'],
            description: json['description'],
            linkInfo: json['linkInfo'],
            status: json['status'],
            startData: json['startData'],
            finishData: json['finishData'],
            user: json['user']
          })
      }

      eventSourceConnection.onerror = (err: any) => {
        console.log( "[TempORealService.eventSourceConnection.onerror] error:", err)
        eventSourceConnection.close()
      }
    })
  }
}