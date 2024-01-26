import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: '[donut-veh]',
  standalone: true,
  templateUrl: './donut-veh.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule],
  styles: []
})
export class DonutVehComponent implements OnInit, OnDestroy {

  public chartOptionsCar: Partial<ChartOptions>;
  public chartOptionsMotorbike: Partial<ChartOptions>;
  public chartOptionsTruck: Partial<ChartOptions>;

  constructor(private themeService: ThemeService) {
    const baseColor = '#7239ea';
    const truckData = [33, 55, 32, 58, 41, 34, 23, 34, 55, 32, 58, 41];
    const carData = [95, 83, 79, 97, 72, 66, 95, 95, 83, 79, 97, 72];
    const motorbikeData = [122, 144, 212, 213, 126, 145, 142, 122, 144, 212, 213, 126];

    function sumVehicleType(data: number[]): number {
      return data.reduce((sum, value) => sum + value, 0);
    }

    const sumCar = sumVehicleType(carData);
    const sumMotorbike = sumVehicleType(motorbikeData);
    const sumTruck = sumVehicleType(truckData);

    const sumVeh =  sumCar + sumMotorbike + sumTruck;
    this.chartOptionsCar = this.getChartOptions('Car', sumCar, sumVeh, '#34495e');
    this.chartOptionsMotorbike = this.getChartOptions('Motorbike', sumMotorbike, sumVeh, '#3498db');
    this.chartOptionsTruck = this.getChartOptions('Truck', sumTruck, sumVeh, '#2ecc71');
  }
    
    

  private getChartOptions(title: string, value: number, total: number, color: string): Partial<ChartOptions> {
    const colors = ['#FF5733', '#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#ecf0f1', '#e67e22', '#34495e', '#d35400', '#bdc3c7'];
    const percent = Math.round(value/total*100)
    return {
      
      nonaxisseries: [percent],
      colors: colors,
      chart: {
        foreColor: '#999',
        type: "radialBar",
        height: 300,
        width: '100%',
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }

      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1],

      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: "70%",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 1,
              opacity: 0.1
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#888",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      
      legend: {
        show:false,
        position: "right",
        offsetY: 40,
        onItemClick: {
          toggleDataSeries: true
      },
      },
      
     
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [color],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [title]
      
      
    };
  

    effect(() => {
      /** change chart theme */
      this.chartOptionsCar.tooltip = {
        theme: this.themeService.themeChanged(),
      };
      
    });
  }

  ngOnInit(): void {
    this.chartOptionsCar.tooltip =
      this.chartOptionsMotorbike.tooltip = this.chartOptionsTruck.tooltip = {
        theme: this.themeService.themeChanged(),
      };
  }
  

  ngOnDestroy(): void {}
}