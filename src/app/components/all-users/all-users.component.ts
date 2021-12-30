import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {NavigationExtras, Router} from "@angular/router";
import {User} from "../../models/UserResponse";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = []
  canDelete: boolean = true;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users
    })
    this.canDelete = localStorage.getItem('canDelete')? true: false
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(successfully =>{
        alert("User with id "+ id + " has been successfully deleted!")
        window.location.reload()
    })
  }

}
