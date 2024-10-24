import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userList$: Observable<User[] | null> = of([]);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userList$ = this.userService.getUsers();

    this.userService.usersUpdated$.pipe().subscribe((res: boolean) => {
      if (res) {
        this.userList$ = this.userService.getUsers();
      }
    })
  }
}
