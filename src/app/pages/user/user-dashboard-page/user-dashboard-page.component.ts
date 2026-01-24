import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from './user.service';
import { User } from '../../../shared/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-user-dashboard-page',
  standalone: true,
  imports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  templateUrl: './user-dashboard-page.component.html',
  styleUrl: './user-dashboard-page.component.scss',
})
export class UserDashboardPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  cols = ['name', 'email', 'role'];
  chart: any;
  pageSizeOptions = [5, 10, 15, 20];
  defaultPageSize = 5;

  @ViewChild('chart', { static: false }) chartRef!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>([]);
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.userService.users$.subscribe((users) => {
      this.dataSource.data = users;
      this.updateChart();
    });
  }

  ngAfterViewInit() {
    this.initChart();
    this.dataSource.paginator = this.paginator;
  }

  async initChart() {
    if (this.chart) return;

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
    const { UserFormComponent } =
      await import('../../../shared/user-form/user-form.component');

    this.dialog.open(UserFormComponent, {
      width: '800px',
    });
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
