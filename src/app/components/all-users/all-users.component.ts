import {Component, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {User} from "../../model";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  data: Array<User>;

  constructor(private restService: RestService) {
    this.data = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.restService.getUsers().subscribe(response => {
      this.data = response;
    });
  }

  onDelete(id: number) {
    this.restService.deleteUserById(id).subscribe(response => {
      this.getUsers();
    });
  }


}
