import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main/main-header/main-header.component';
import { MainColumnChart } from '../../components/main/column-chart/column-chart.component';
import { MapComponent } from '../../components/main/map/map.component';
import { BarRankingComponent } from '../../components/main/bar-ranking/bar-ranking.component';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    standalone: true,
    imports: [
        MainHeaderComponent,
        MainColumnChart,
        MapComponent,
        BarRankingComponent

    ],
})
export class MainComponent  {
 
}
