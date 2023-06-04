import { Component, OnInit } from '@angular/core';
import { User } from '../model/user/user';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  //each user should contains all permisions.
  users: User[] = []
  // represent all permisions
  role: string[] = []
  userForm!: FormGroup;

  constructor(private userSevice: UserService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup( {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

    this.userSevice.getUsers()
      .subscribe(user => this.users.push(user));
    this.userSevice.getPermisions()
      .subscribe(r => this.role.push(r));
  }
  
  updateAllComplete(user: User) {
    this.userSevice.updateUserPermisions(user)
      .subscribe(u => console.log(u))
  }

  onUser(user:User) {
    console.log(user)
  }

  onSubmit() {
    let user: User = {
      "id": 0,
      "firstName": this.userForm.value.firstName,
      "lastName": this.userForm.value.lastName,
      "email": this.userForm.value.email,
      "password": this.userForm.value.password,
      "keycloakId": "",
      "role": []
    }

    console.log(user)
  }
}
