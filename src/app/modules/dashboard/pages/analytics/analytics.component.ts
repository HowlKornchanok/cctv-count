import { Component } from '@angular/core';
import { AnalyticsHeaderComponent } from '../../components/analytics/analytics-header/analytics-header.component';
import { DonutVehComponent } from '../../components/analytics/donut-veh/donut-veh.component';
import { PCUComponent } from '../../components/analytics/pcu/pcu.component';
import { SpeedGaugeComponent } from '../../components/analytics/speed-gauge/speed-gauge.component';
import { HistoryTableComponent } from '../../components/analytics/history-table/history-table.component';
<<<<<<< HEAD
import { APIDonutComponent } from '../../components/analytics/api-donut/api-donut.component';
=======
>>>>>>> 78a67d92f85d695523aa9b535de51bae75e1a1ff

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    standalone: true,
    imports: [
        AnalyticsHeaderComponent,
        DonutVehComponent,
        PCUComponent,
        SpeedGaugeComponent,
<<<<<<< HEAD
        APIDonutComponent
=======
        HistoryTableComponent
>>>>>>> 78a67d92f85d695523aa9b535de51bae75e1a1ff
        


    ],
})
export class AnalyticsComponent {

}
