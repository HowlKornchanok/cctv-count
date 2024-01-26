import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent} from './pages/analytics/analytics.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from '../auth/auth.component';
import { HistoryComponent } from './pages/history/history.component';


const routes: Routes = [
  
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'history', component:HistoryComponent},
      { path: '**', redirectTo: 'error/404' },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
