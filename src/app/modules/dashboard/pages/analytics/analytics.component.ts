import { Component } from '@angular/core';
import { AnalyticsHeaderComponent } from '../../components/analytics/analytics-header/analytics-header.component';
import { DonutVehComponent } from '../../components/analytics/donut-veh/donut-veh.component';
import { PCUComponent } from '../../components/analytics/pcu/pcu.component';
import { SpeedGaugeComponent } from '../../components/analytics/speed-gauge/speed-gauge.component';
import { HistoryTableComponent } from '../../components/analytics/history-table/history-table.component';
import { APIDonutComponent } from '../../components/analytics/api-donut/api-donut.component';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    standalone: true,
    imports: [
        AnalyticsHeaderComponent,
        DonutVehComponent,
        PCUComponent,
        SpeedGaugeComponent,
        APIDonutComponent
        


    ],
})
export class AnalyticsComponent {

}
