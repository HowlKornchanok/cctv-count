// speed-gauge.component.ts
import { Component, OnInit, effect,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/core/services/data.service';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from 'src/app/shared/models/chart-options';
import { ThemeService } from 'src/app/core/services/theme.service';
@Component({
  selector: '[history-table]',
  standalone: true,
  templateUrl: './history-table.component.html',
  imports: [AngularSvgIconModule, NgApexchartsModule,CommonModule, ],
  styleUrls: ['./history-table.component.scss'],
  providers: [DataService],
})
export class HistoryTableComponent implements OnInit, OnDestroy {

  public jsonData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 50;
  totalPages: number = 10;

  constructor(private dataService: DataService) {}
  currentFilter: string = '7days';
    
  ngOnInit(): void {
    this.loadData();
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  


  private loadData(): void {
    this.dataService.getData().subscribe(
      (data) => {
        this.jsonData = this.filterData(data, this.currentFilter);
        this.totalPages = Math.ceil(this.jsonData.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  changeFilter(filter: string): void {
    this.currentFilter = filter;
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
      default:
        // Default to all data
        return data;
    }

    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= filterDate && itemDate <= today;
    });
  }

  ngOnDestroy(): void {
      
  }



  
  
}