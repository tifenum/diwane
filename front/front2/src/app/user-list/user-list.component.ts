import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/admin/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from '../models/userDto';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users?: UserDto[];

  constructor(
    private userService: UserService,
    private toastr: ToastrService  ,
    
  ) {}


  ngOnInit(): void {
    this.getAllUsers();

  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => { 
        this.users=data
        console.log("user",data)
       }
    );
  }
 
}
