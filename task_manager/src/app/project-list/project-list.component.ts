import { Component, OnInit } from '@angular/core';
import { Project } from '../model/project/project';
import { ProjectService } from '../project.service';
import { Dialog } from '@angular/cdk/dialog';
import { ProjectDialog } from './dialog/project_dialog';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects !: Project[];
  newProject: Project =  {
    id: 0,
    name: "",
    description: "",
    startData: new Date,
    status: {
      id: 0,
      status: "NEW"
    }
  };

  constructor(private projectSevice: ProjectService,
    public dialog: Dialog) {}

  ngOnInit(): void {
    this.projectSevice.getProjects()
      .subscribe(projects => this.projects = projects);
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
  }

  createProject(project: Project) {
    this.projectSevice.createProject(project).subscribe();
  }
}
