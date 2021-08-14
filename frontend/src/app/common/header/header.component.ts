import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sevice/user';
import {User} from '../../model/user.model';

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
  }

  ngOnInit(): void {
  }

}
