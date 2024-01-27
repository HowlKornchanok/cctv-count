import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main/main-header/main-header.component';
import { MainColumnChart } from '../../components/main/column-chart/column-chart.component';
import { MapComponent } from '../../components/main/map/map.component';
import { BarRankingComponent } from '../../components/main/bar-ranking/bar-ranking.component';
import { ApiStackedColumnComponent } from '../../components/main/api-stacked-column/api-stacked-column.component';
import { SumBarComponent } from '../../components/main/sum-bar/sum-bar.component';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    standalone: true,
    imports: [
        MainHeaderComponent,
        MainColumnChart,
        MapComponent,
        BarRankingComponent,
        ApiStackedColumnComponent,
        SumBarComponent

    ],
})
export class MainComponent  {
 
}
