import { Component } from '@angular/core';
import { AnalyticsHeaderComponent } from '../../components/analytics/analytics-header/analytics-header.component';
@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    standalone: true,
    imports: [
        AnalyticsHeaderComponent,

    ],
})
export class AnalyticsComponent {

}
