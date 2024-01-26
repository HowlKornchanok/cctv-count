import { Component, OnDestroy, OnInit, effect } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { AngularSvgIconModule } from 'angular-svg-icon';


@Component({
  selector: '[PCUchart]',
  standalone: true,
  templateUrl: './PCU.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule],
  styles: []
})
export class PCUComponent implements OnInit, OnDestroy {

  public chartOptions: Partial<ChartOptions>;


  constructor(private themeService: ThemeService) {

    const phase1 = [33, 55, 32, 58, 41, 34, 23, 34, 55, 32, 58, 41];
    const phase2 = [95, 83, 79, 97, 72, 66, 95, 95, 83, 79, 97, 72];
    const phase3 = [122, 144, 112, 113, 126, 115, 112, 122, 121, 112, 113, 126];
    const arrayLength = phase1.length;
    const averageData = Array.from({ length: arrayLength }, (_, index) => {
      const sum = phase1[index] + phase2[index] + phase3[index];
      return Math.round(sum / 3);
    });

    this.chartOptions = {
      series: [
        {
          name: "Phase I",
          data: phase1,
          type: 'bar'
        },
        {
          name: "Phase II",
          data: phase2,
          type: 'bar'
        },
        {
          name: "Phase III",
          data: phase3,
          type: 'bar'

        },
        {
          name: "Average",
          data: averageData,
          type: 'line'
        }
        

      ],
      chart: {
        foreColor: '#999',
        type: "line",
        height: '100%',
        width: '100%',
        stacked: false,
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
              position: "bottom",
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
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011",
          "07/2011",
          "08/2011",
          "09/2011",
          "10/2011",
          "11/2011",
          "12/2011",
        ]
      },
      legend: {
        
        position: "bottom",
        
        onItemClick: {
          toggleDataSeries: true
      },
      },
      
     
      fill: {
        opacity: 0.9
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
