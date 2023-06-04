import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormControl } from '@angular/forms';
import { Task } from '../model/task/task';
import { TaskService } from '../task.service';
import { Project } from '../model/project/project';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { TaskCreate } from './task-create/task-create';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private projectSevice: ProjectService,
    private taskService: TaskService,
    public dialog: Dialog){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.loadDate(param['id'])
    })
  }

  loadDate(id : number) {
    this.tasks = []

    this.projectSevice.getProjectById(id)
      .subscribe(p => {
        this.projectInfo = p
        console.log(p)
      })

    this.taskService.getTasksByProjectId(id)
      .subscribe(t => {
        this.tasks.push(t)
      })
  }

  getOldTasks(): Task[] {
    return this.tasks
      .filter(t => t.status == 'COMPLETE')
      .sort((a, b) => (a.finishData! > b.finishData! ? -1 : 1));
  }

  getCurrentTasks(): Task[] {
    return this.tasks.filter(t => t.status == 'STARTED')
  }

  getUnactiveTasks(): Task[] {
    return this.tasks.filter(t => t.status == 'UNACTIVE')
  }

  onTakeOn(task: Task) {
    console.log(task)
    this.taskService.updateToWork(task).subscribe(s => {
      this.loadDate(this.projectInfo.id)
    })
  }

  onClose(task: Task) {
    this.taskService.updateToClose(task).subscribe(s => {
      this.loadDate(this.projectInfo.id)
    })
  }

  onAddTask(): void {
    console.log("on add task")
      const dialogRef = this.dialog.open<Task>(TaskCreate, {
        width: '300px'
      });
  
      dialogRef.closed.subscribe(result => {
        console.log('The dialog was closed ' + result);
        if (result !== undefined) {
          this.taskService.createTask(result, this.projectInfo.id)
            .subscribe(s => {
              this.loadDate(this.projectInfo.id)
            })
        }
      });
  }

  onChangeTask(task: Task) {
    console.log("on Change Task")
      const dialogRef = this.dialog.open<Task>(TaskCreate, {
        width: '300px',
        data: task
      });
  
      dialogRef.closed.subscribe(result => {
        
        if (result !== undefined) {
          this.taskService.updateTask(result)
            .subscribe(s => {
              this.loadDate(this.projectInfo.id)
            })
        }
      });
  }
}
