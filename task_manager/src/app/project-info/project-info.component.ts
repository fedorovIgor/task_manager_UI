import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormControl } from '@angular/forms';
import { Task } from '../model/task/task';
import { TaskService } from '../task.service';
import { Project } from '../model/project/project';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  projectInfo: Project = {
    id: 0,
    description: '',
    name: '',
    startDate: new Date(),
    status: ''
  }
  
  taskToCreate!: Task

  tasks: Task[] = []

  taskRepresanted = new FormControl('')

  constructor(private projectSevice: ProjectService,
    private taskService: TaskService){}

  ngOnInit(): void {
    this.projectSevice.getProjectById(2)
      .subscribe(p => {
        this.projectInfo = p
        console.log(p)
      })

    this.taskService.getTasksByProjectId(2)
      .subscribe(t => this.tasks.push(t))

  }

  getOldTasks(): Task[] {
    return this.tasks.filter(t => t.status == 'COMPLITE')
  }

  getCurrentTasks(): Task[] {
    return this.tasks.filter(t => t.status == 'STARTED')
  }

  getUnactiveTasks(): Task[] {
    return this.tasks.filter(t => t.status == 'UNACTIVE')
  }
}
