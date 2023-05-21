import { Component, OnInit } from '@angular/core';
import { User } from '../model/user/user';
import { Permision } from '../model/user/permision';
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
  permisions: Permision[] = []

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
      .subscribe(users => this.users = users);
    this.userSevice.getPermisions()
      .subscribe(permisions => this.permisions = permisions);
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
      "permisions": []
    }

    console.log(user)
  }
}
