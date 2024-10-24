import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.endPoint;
  private userList: User[] = [];
  users$ = new BehaviorSubject<User[]>([]);
  usersUpdated$ = new BehaviorSubject<boolean>(false);
  private isFirstTime = true;
  constructor(
    private http: HttpClient,
    private notification: NotificationService,
  ) {}

  getUsers(): Observable<User[]> {
    return this.isFirstTime ?
    this.http.get<User[]>(`${this.api}/users`).pipe(
      tap({
        next: (data) => {
          this.userList = data;
          this.users$.next(data)
        },
        error: () =>
          this.notification.error('Unable to download the selected report'),
      }),
      catchError(() => EMPTY),
    ) :
    of(this.userList);
  }

  getUserById(id: number): User | undefined {
    return this.userList.find((user: User) => user.id ===  Number(id))
  }

  addUser(user: User): void {
    user.id = this.userList.length + 1;
    this.userList.push(user);
    this.isFirstTime = false;
    this.usersUpdated$.next(true);
  }

  deleteUser(id: number): Observable<void> {
    this.userList = this.userList.filter((user: User) => user.id !== id);
    // this.users$.next(this.userList);
    this.usersUpdated$.next(true);
    this.isFirstTime = false;
    return EMPTY;
  }

  updateUser(userToUpdate: User): void {
    const index = this.userList.findIndex((user: User) => user.id === userToUpdate.id);
    if (index > -1) {
      this.userList[index] = userToUpdate;
      this.usersUpdated$.next(true);
      this.isFirstTime = false;
    }
  }
}
