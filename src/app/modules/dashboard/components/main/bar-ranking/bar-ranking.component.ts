import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: '[main-bar-chart]',
  templateUrl: './bar-ranking.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, NgApexchartsModule, ],
  styles: [],
  
})
export class BarRankingComponent implements OnInit, OnDestroy {
  public chartOptions: Partial<ChartOptions>;

  constructor(private themeService: ThemeService) {
    const truckData = [33, 55, 32, 58, 41, 34, 23,34, 55, 32, 58, 41,]; 
    const carData = [95, 83, 79, 97, 72, 66, 95,95, 83, 79, 97, 72, ];
    const motorbikeData = [122, 144, 212, 213, 126, 145, 142,122, 144, 212, 213, 126];
    const busData = [22, 44, 12, 13, 26, 45, 42,22, 44, 12, 13, 26];

    
    function sumOf(vehData: number[]): number {
      return vehData.reduce((acc, value) => acc + value, 0);
    }
    const sumBus = sumOf(busData);
    const sumCar = sumOf(carData);
    const sumMotorbike = sumOf(motorbikeData);
    const sumTruck = sumOf(truckData)
    const ranking = [
      { category: 'Bus', value: sumBus, color: '#F44336' },
      { category: 'Car', value: sumCar, color: '#E91E63' },
      { category: 'Motorbike', value: sumMotorbike, color: '#9C27B0' },
      { category: 'Truck', value: sumTruck, color: '#2196F3' },
    ];
    ranking.sort((a, b) => b.value - a.value);

    this.chartOptions = {
      series: ranking.map((item) => ({
        name: item.category,
        data: [item.value],
        color: item.color,
        group: item.category
      })),
    

      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
  

      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Total'],
      },
      fill: {
        
      },
    };
  
    

    effect(() => {
      /** change chart theme */
      this.chartOptions.tooltip = {
        theme: this.themeService.themeChanged(),
      };
      
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}

