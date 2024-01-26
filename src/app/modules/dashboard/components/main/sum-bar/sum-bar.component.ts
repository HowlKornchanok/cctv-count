import { Component,OnInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumVehDataService } from 'src/app/core/services/sum-veh-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: '[sum-bar]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sum-bar.component.html',
  styles: [],
  providers:[SumVehDataService]
})
export class SumBarComponent implements OnInit, OnDestroy{
  public jsonData: any[] = [];
  private dataServiceSubscription: Subscription | undefined;

  constructor(private dataService:SumVehDataService) {}
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
    this.dataServiceSubscription = this.dataService.getData().subscribe(
      (data) => {
        this.jsonData = data;
        // You can call your filtering and sum functions here based on the time ranges
        const sumCarLast7Days = this.calculateSumLastNDays('sumCar', 7);
        const sumCarByMonth = this.calculateSumByMonth('sumCar');
        const sumCarByYear = this.calculateSumByYear('sumCar');
        const sumMotorcycleLast7Days = this.calculateSumLastNDays('sumMotorcycle', 7);
        const sumMotorcycleByMonth = this.calculateSumByMonth('sumMotorcycle');
        const sumMotorcycleByYear = this.calculateSumByYear('sumMotorcycle');
        const sumBusLast7Days = this.calculateSumLastNDays('sumBus', 7);
        const sumBusByMonth = this.calculateSumByMonth('sumBus');
        const sumBusByYear = this.calculateSumByYear('sumBus');
        const sumTruckLast7Days = this.calculateSumLastNDays('sumTruck', 7);
        const sumTruckByMonth = this.calculateSumByMonth('sumTruck');
        const sumTruckByYear = this.calculateSumByYear('sumTruck');

        console.log('Sum Car Last 7 Days:', sumCarLast7Days);
        console.log('Sum Car By Month:', sumCarByMonth);
        console.log('Sum Car By Year:', sumCarByYear);

        console.log('Sum Motorcycle Last 7 Days:', sumMotorcycleLast7Days);
        console.log('Sum Motorcycle By Month:', sumMotorcycleByMonth);
        console.log('Sum Motorcycle By Year:', sumMotorcycleByYear);

        console.log('Sum Bus Last 7 Days:', sumBusLast7Days);
        console.log('Sum Bus By Month:', sumBusByMonth);
        console.log('Sum Bus By Year:', sumBusByYear);

        console.log('Sum Truck Last 7 Days:', sumTruckLast7Days);
        console.log('Sum Truck By Month:', sumTruckByMonth);
        console.log('Sum Truck By Year:', sumTruckByYear);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  private calculateSumLastNDays(property: string, days: number): number {
    const today = new Date();
    const filterDate = new Date(today);
    filterDate.setDate(today.getDate() - days);

    return this.jsonData
      .filter((item) => new Date(item.date) >= filterDate && new Date(item.date) <= today)
      .reduce((sum, item) => sum + item[property], 0);
  }

  private calculateSumByMonth(property: string): number {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return this.jsonData
      .filter((item) => new Date(item.date) >= firstDayOfMonth && new Date(item.date) <= today)
      .reduce((sum, item) => sum + item[property], 0);
  }

  private calculateSumByYear(property: string): number {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  
    const sumByYear = Array.from({ length: 12 }, (_, monthIndex) => {
      const firstDayOfMonth = new Date(today.getFullYear(), monthIndex, 1);
      const lastDayOfMonth = new Date(today.getFullYear(), monthIndex + 1, 0);
  
      return this.jsonData
        .filter((item) => new Date(item.date) >= firstDayOfMonth && new Date(item.date) <= lastDayOfMonth)
        .reduce((sum, item) => sum + item[property], 0);
    }).reduce((totalSum, monthlySum) => totalSum + monthlySum, 0);
  
    return sumByYear;
  }
}