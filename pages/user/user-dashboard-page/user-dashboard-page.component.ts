import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from './user.service';
import { User } from '../../../shared/user.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-dashboard-page',
  standalone: true,
  imports: [MatDialogModule, MatTableModule, MatButtonModule, MatCardModule],
  templateUrl: './user-dashboard-page.component.html',
  styleUrl: './user-dashboard-page.component.scss',
})
export class UserDashboardPageComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  cols = ['name', 'email', 'role'];
  chart: any;

  @ViewChild('chart', { static: false }) chartRef!: ElementRef;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.userService.users$.subscribe((users) => {
      this.users = users;
      this.updateChart(); // ✅ only update data
    });
  }

  ngAfterViewInit() {
    this.initChart();
  }

  async initChart() {
    if (this.chart) return; // ✅ prevent duplicate chart creation

    const Chart = (await import('chart.js/auto')).default;

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#1c4980', '#383838', '#b0b0b0'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    this.updateChart(); // ✅ first render
  }

  updateChart() {
    if (!this.chart) return;

    const count = { Admin: 0, Editor: 0, Viewer: 0 };
    this.users.forEach((u) => count[u.role]++);

    this.chart.data.datasets[0].data = Object.values(count);
    this.chart.update();
  }

  async openForm() {
    const { UserFormComponent } =
      await import('../../../shared/user-form/user-form.component');

    this.dialog.open(UserFormComponent, {
      width: '800px',
    });
  }
}
