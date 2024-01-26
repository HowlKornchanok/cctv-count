import { Component } from '@angular/core';
import { MainHeaderComponent } from '../../components/main/main-header/main-header.component';
import { MainColumnChart } from '../../components/main/column-chart/column-chart.component';
import { MapComponent } from '../../components/main/map/map.component';
import { BarRankingComponent } from '../../components/main/bar-ranking/bar-ranking.component';
<<<<<<< HEAD
import { ApiStackedColumnComponent } from '../../components/main/api-stacked-column/api-stacked-column.component';
import { SumBarComponent } from '../../components/main/sum-bar/sum-bar.component';
=======
>>>>>>> 78a67d92f85d695523aa9b535de51bae75e1a1ff


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    standalone: true,
    imports: [
        MainHeaderComponent,
        MainColumnChart,
        MapComponent,
<<<<<<< HEAD
        BarRankingComponent,
        ApiStackedColumnComponent,
        SumBarComponent
=======
        BarRankingComponent
>>>>>>> 78a67d92f85d695523aa9b535de51bae75e1a1ff

    ],
})
export class MainComponent  {
 
}
