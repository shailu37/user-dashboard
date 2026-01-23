import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from '../../../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private usersSubject = new BehaviorSubject<User[]>([
    {
      name: 'Rahul Sharma',
      email: 'rahul@test.com',
      role: 'Admin',
    },
    {
      name: 'Anita Verma',
      email: 'anita@test.com',
      role: 'Editor',
    },
    {
      name: 'Mohit Singh',
      email: 'mohit@test.com',
      role: 'Viewer',
    },
    {
      name: 'Priya Kapoor',
      email: 'priya@test.com',
      role: 'Editor',
    },
  ]);
  users$ = this.usersSubject.asObservable();
  addUser(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }
}
