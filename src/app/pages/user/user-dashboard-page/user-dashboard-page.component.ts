import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";

import { UserService } from "./user.service";
import { User } from "../../../shared/user.model";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-dashboard-page",
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: "./user-dashboard-page.component.html",
  styleUrl: "./user-dashboard-page.component.scss",
})
export class UserDashboardPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  cols = ["name", "email", "role", "actions"];
  chart: any;
  pageSizeOptions = [5, 10, 15, 20];
  defaultPageSize = 10;
  userFormComponent: any = null;

  @ViewChild("chart", { static: false }) chartRef!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>([]);
  isUserFormOpen: boolean = false;
  sortDirection: "asc" | "desc" = "asc";
  selectedUser: User | null = null;
  formMode: "add" | "edit" = "add";
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.users$.subscribe((users) => {
      console.log("users", users);

      this.dataSource.data = users;
      this.updateChart();
    });
  }

  addUser(user: any) {
    this.userService.addUser(user);
  }

  sortByName() {
    const data = [...this.dataSource.data];

    data.sort((a: User, b: User): number => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return this.sortDirection === "asc" ? -1 : 1;
      if (nameA > nameB) return this.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.initChart();
    this.dataSource.paginator = this.paginator;
  }

  async initChart() {
    if (this.chart) return;

    const Chart = (await import("chart.js/auto")).default;

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: "pie",
      data: {
        labels: ["Admin", "Editor", "Viewer"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#1c4980", "#383838", "#b0b0b0"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    this.updateChart();
  }

  updateChart() {
    if (!this.chart) return;

    const count = { Admin: 0, Editor: 0, Viewer: 0 };
    this.dataSource.data.forEach((u) => count[u.role]++);

    this.chart.data.datasets[0].data = Object.values(count);
    this.chart.update();
  }

  async openForm() {
    this.formMode = "add";
    this.selectedUser = null;

    if (!this.userFormComponent) {
      const module =
        await import("../../../shared/user-form/user-form.component");
      this.userFormComponent = module.UserFormComponent;
    }

    this.isUserFormOpen = true;
  }

  async editUser(user: User) {
    this.formMode = "edit";
    this.selectedUser = user;

    if (!this.userFormComponent) {
      const module =
        await import("../../../shared/user-form/user-form.component");
      this.userFormComponent = module.UserFormComponent;
    }

    this.isUserFormOpen = true;
  }

  closeForm() {
    this.isUserFormOpen = false;
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
