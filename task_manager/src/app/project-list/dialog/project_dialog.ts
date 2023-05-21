import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from "src/app/model/project";

@Component({
    selector: 'app-project-list-dialog',
    templateUrl: 'app-project-list-dialog.html',
    styleUrls: ['app-project-list-dialog.css'],
  })
  export class ProjectDialog implements OnInit {

    project!: FormGroup;

    constructor(public dialogRef: DialogRef<Project>,
       @Inject(DIALOG_DATA) public data: Project) {}

    ngOnInit(): void {
      this.project = new FormGroup( {
        name: new FormControl('', [Validators.required]),
        description: new FormControl()
      })
  
      if(this.data) {
        this.project.controls["name"].setValue(this.data.name);
        this.project.controls["description"].setValue(this.data.description);
      }
    }

    onSubmit() {

      let project: Project = {
        "id": 0,
        "name": this.project.value.name,
        "description": this.project.value.description,
        "startData": new Date,
        "status": {
          "id" : 0,
          "status": "ACTIVE"
        }
      }
  
      console.log(this.project)
      this.dialogRef.close(project);
    }
  }