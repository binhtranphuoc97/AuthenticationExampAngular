import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(result => {
      this.users = result;
    })
  }
}
