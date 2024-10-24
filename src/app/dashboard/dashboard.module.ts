import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserInfoModule } from '../shared/user-info/user-info.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, UserInfoModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
