import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SumVehDataService } from 'src/app/core/services/sum-veh-data.service';
@Component({
    selector: '[api-stacked-column]',
    templateUrl: './api-stacked-column.component.html',
    standalone: true,
    imports: [AngularSvgIconModule, NgApexchartsModule],
    styles: [],
    providers: [SumVehDataService]
})

export class ApiStackedColumnComponent implements OnInit, OnDestroy {
  public jsonData: any[] = [];
  public chartOptions: Partial<ChartOptions> = {};
  private dataServiceSubscription: Subscription | undefined;
  public currentFilter: string = '7days';
  constructor(private dataService: SumVehDataService) {}
  
  
  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    // Unsubscribe from the data service to prevent memory leaks
    if (this.dataServiceSubscription) {
      this.dataServiceSubscription.unsubscribe();
    }
  }

  private loadData(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.jsonData = this.filterData(data, this.currentFilter);
        this.chartOptions = this.generateChartOptions(this.jsonData);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  changeFilter(event: any): void {
    this.currentFilter = event.target.value;
    this.loadData();
  }

  private filterData(data: any[], interval: string): any[] {
    const today = new Date();
    let filterDate: Date;

    switch (interval) {
      case '1day':
        filterDate = new Date(today);
        filterDate.setDate(today.getDate() - 1);
        break;
      case '7days':
        filterDate = new Date(today);
        filterDate.setDate(today.getDate() - 7);
        break;
      case '1month':
        filterDate = new Date(today);
        filterDate.setMonth(today.getMonth() - 1);
        break;
      case '1year':
        filterDate = new Date(today);
        filterDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        // Default to all data
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= filterDate && itemDate <= today;
    });
  }

  private generateChartOptions(data: any[]): Partial<ChartOptions> {
    const colors = ['#FF0000'];
    const categories = data.map(entry => entry.date);
    const seriesData = [
      {
        name: 'Truck',
        data: data.map(entry => entry.sumTruck),
        type: 'bar'
      },
      {
        name: 'Car',
        data: data.map(entry => entry.sumCar),
        color: '#009900',
        type: 'bar'
      },
      {
        name: 'Motorbike',
        data: data.map(entry => entry.sumMotorcycle),
        type: 'bar'
      },
      {
        name: 'Bus',
        data: data.map(entry => entry.sumBus),
        type: 'bar'
      },
      {
        name: 'Total',
        type: 'line',
        data: data.map(entry => entry.sumVehicle),
        color: '#FF0000'
      }
    ];

    return {
      series: seriesData,
      chart: {
        foreColor: '#999',
        type: 'line',
        height: '100%',
        width: '100%',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [4]
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: 'category',
        categories: categories
      },
      legend: {
        position: 'right',
        offsetY: 40,
        onItemClick: {
          toggleDataSeries: true
        }
      },
      fill: {
        opacity: 0.9
      }
    };
  }
}
