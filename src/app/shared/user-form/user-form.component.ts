import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { UserService } from "../../pages/user/user-dashboard-page/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../user.model";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./user-form.component.html",
})
export class UserFormComponent {
  form: FormGroup;
  @Output() closeForm = new EventEmitter<void>();
  @Input() mode: "add" | "edit" = "add";
  @Input() user: User | null = null;
  @Input() onClose!: () => void;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required],
    });
  }
  ngOnInit() {
    if (this.mode === "edit" && this.user) {
      this.form.patchValue(this.user);
    }
  }

  submit() {
    if (this.form.invalid) return;

    if (this.mode === "add") {
      this.userService.addUser(this.form.value as User);
    } else {
      this.userService.updateUser({
        ...this.user!,
        ...this.form.value,
      });
    }

    this.onClose();
  }
}
