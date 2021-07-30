import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import {User} from '../../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:User
  constructor(
    private userService: UserService
  ) { 
    this.user = this.userService.userValue;
    console.log("=====>>",this.user)
  }

  ngOnInit(): void {
  }

}
