import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnDestroy {
  @Input()
  users: User[] | null = [];
  destroy$ = new Subject();

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  editUser(id: number): void {
    console.log('id', id);
    this.router.navigate(['user', id]);
  }

  deleteUser(id: number): void {
    console.log('here', id)
    this.userService.deleteUser(id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigate(['main']);
      console.log('deleting')
    });
    
    
  }
}
