import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ProjectInfo } from '../model/project/project_info';
import { FormControl } from '@angular/forms';
import { Task } from '../model/task/task';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  projectInfo: ProjectInfo = {
    id: 0,
    fullDescription: '',
    name: '',
    tasks: []
  }

  taskRepresanted = new FormControl('')

  constructor(private projectSevice: ProjectService){}

  ngOnInit(): void {
    this.projectSevice.getProjectInfo(0)
      .subscribe(p => this.projectInfo = p)
  }

  getOldTasks(): Task[] {
    var tasks = this.projectInfo.tasks.filter(t => t.status == 'COMPLITED')
    console.log(tasks)
    return tasks;
  }

  getCurrentTasks(): Task[] {
    return this.projectInfo.tasks
      .filter(f => f.status == 'CURRENT')
  } 
  
  getUnactiveTasks(): Task[] {
    return this.projectInfo.tasks
      .filter(f => f.status == 'UNACTIVE')
  }
}
