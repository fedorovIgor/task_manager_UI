import { Component, OnInit } from '@angular/core';
import { User } from '../model/user/user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../model/task/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    keycloakId: '',
    role: []
  }

  userTasks: Task[] = []

  constructor(
    private taskService: TaskService,
    private userService: UserService){}

  ngOnInit(): void {
    this.loadDate()
  }

  loadDate() {
    this.userTasks = []

    this.userService.getUserInfo()
      .subscribe(u => {
        this.user = u
      })

    this.taskService.getUserTask()
      .subscribe(t => {
        this.userTasks.push(t)
      })
  }

}
