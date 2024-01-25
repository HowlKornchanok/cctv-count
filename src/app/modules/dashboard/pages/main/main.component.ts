import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main/main-header/main-header.component';
import { MainColumnChart } from '../../components/main/column-chart/column-chart.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    standalone: true,
    imports: [
        MainHeaderComponent,
        MainColumnChart
    ],
})
export class MainComponent  {
 
}
