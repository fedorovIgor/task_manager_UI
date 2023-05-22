import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './model/project/project';
import { Observable } from 'rxjs';
import { ProjectInfo } from './model/project/project_info';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  hostLink: string = "http://192.168.1.100:8085/";

  
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.hostLink + "api/v1/project")
  }

  getProjectInfo(id: number): Observable<ProjectInfo> {
    return this.http.get<ProjectInfo>(this.hostLink + "api/v1/project/" + id)
  }
  
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.hostLink + "api/v1/project", project)
  }
}
