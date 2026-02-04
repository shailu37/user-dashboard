import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { User } from "../../../shared/user.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}
  private usersSubject = new BehaviorSubject<User[]>([
    { id: 1, name: "Rahul Sharma", email: "rahul@test.com", role: "Admin" },
    { id: 2, name: "Anita Verma", email: "anita@test.com", role: "Editor" },
    { id: 3, name: "Mohit Singh", email: "mohit@test.com", role: "Viewer" },
    { id: 4, name: "Priya Kapoor", email: "priya@test.com", role: "Editor" },
    { id: 5, name: "Rohtash Singh", email: "rohtash@test.com", role: "Viewer" },
    { id: 6, name: "Riya Kapoor", email: "riya@test.com", role: "Editor" },
  ]);

  users$ = this.usersSubject.asObservable();
  addUser(user: Omit<User, "id">) {
    const newUser: User = {
      ...user,
      id: Date.now(), // simple unique id
    };

    this.usersSubject.next([...this.usersSubject.value, newUser]);
  }

  updateUser(updated: User) {
    const users = this.usersSubject.value.map((u) =>
      u.id === updated.id ? updated : u,
    );

    this.usersSubject.next(users);
  }
}
