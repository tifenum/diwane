import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard-service.service';
import { Chart, registerables } from 'chart.js';
import { ApexChart, ApexFill, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions, ApexResponsive, ApexNonAxisChartSeries } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  fill: ApexFill;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chartOptions: ChartOptions = {
    series: [],
    chart: {
      type: 'donut',
      height: 350
    },
    labels: [],
    fill: {
      opacity: 1
    },
    title: {
      text: 'Somme des Demandes par Statut'
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '50%'
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  totalDemandes: number = 0;
  totalUsers: number = 0;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadChartData();
    this.loadUserChartData();
    this.loadTotalDemandes();
    this.loadTotalUsers();
  }

  loadChartData(): void {
    this.dashboardService.getDemandesByStatues().subscribe((data: { statue: string, count: number }[]) => {
      const seriesData = data.map(item => item.count);
      const labelsData = data.map(item => item.statue);

      this.chartOptions.series = seriesData;
      this.chartOptions.labels = labelsData;
    });
  }

  loadUserChartData(): void {
    this.dashboardService.countUsersByRole().subscribe(data => {
      console.log('User roles data:', data); // Vérifiez les données récupérées
      const labels = Object.keys(data);
      const values = Object.values(data);

      if (labels.length > 0 && values.length > 0) {
        new Chart('userRoleChart', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Users',
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Number of Users by Role'
              }
            }
          }
        });
      } else {
        console.log('No data available to render the user role chart.');
      }
    });
  }

  loadTotalDemandes(): void {
    this.dashboardService.countAllDemandes().subscribe(total => {
      this.totalDemandes = total;
    });
  }

  loadTotalUsers(): void {
    this.dashboardService.countAllUsers().subscribe(total => {
      this.totalUsers = total;
    });
  }
}
