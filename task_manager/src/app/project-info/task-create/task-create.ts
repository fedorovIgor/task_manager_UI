import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { Task } from "src/app/model/task/task";


@Component({
    selector: 'app-project-list-dialog',
    templateUrl: 'task-create.html',
    styleUrls: ['task-create.css'],
  })
export class TaskCreate implements OnInit {

    taskInfo !: FormGroup;

    constructor(public dialogRef: DialogRef<Task>,
         @Inject(DIALOG_DATA) public data: Task) {}
    
    ngOnInit(): void {

        this.taskInfo = new FormGroup( {
            
            id: new FormControl(0),
            header: new FormControl(''),
            description: new FormControl('') ,
            linkInfo: new FormControl('') ,
            status: new FormControl('') 
            
        })

        if(this.data) {
            this.taskInfo.controls["id"].setValue(this.data.id);
            this.taskInfo.controls["header"].setValue(this.data.header);
            this.taskInfo.controls["description"].setValue(this.data.description);
            this.taskInfo.controls["linkInfo"].setValue(this.data.linkInfo);
            this.taskInfo.controls["status"].setValue(this.data.status);
          }
    }

    onSubmit() {

        let status = this.taskInfo.value.status == '' ? 'UNACTIVE' :  this.taskInfo.value.status
        let task: Task = {

          "id": this.taskInfo.value.id,
          "header": this.taskInfo.value.header,
          "description": this.taskInfo.value.description,
          "linkInfo": this.taskInfo.value.linkInfo,
          "status": status,
          "userKeycloakId": ""
        }
    
        console.log(this.taskInfo)
        this.dialogRef.close(task);
      }

    
}