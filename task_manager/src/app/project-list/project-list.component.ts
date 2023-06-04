import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project/project';
import { ProjectService } from '../project.service';
import { Dialog } from '@angular/cdk/dialog';
import { ProjectDialog } from './dialog/project_dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects : Project[] = [];
  newProject: Project =  {
    id: 0,
    name: "",
    description: "",
    startDate: new Date,
    status: 'ACTIVE'
  };

  constructor(private projectSevice: ProjectService,
    private router: Router,
    public dialog: Dialog) {}

  ngOnInit(): void {
    this.projectSevice.getProjects()
      .subscribe((p: Project) => this.projects.push(p))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<Project>(ProjectDialog, {
      width: '550px',
      data: {animal: this.newProject},
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');

      if (result !== undefined) {
        this.newProject = result;
        this.createProject(this.newProject);
      }
    });
  }
  

  onProject(project: Project) {
    console.log("click on project id " + project.id)
    this.router.navigateByUrl("/project/" + project.id)
  }

  createProject(project: Project) {
    this.projectSevice.createProject(project).subscribe();
  }
}
