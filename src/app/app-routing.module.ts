import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: DashboardComponent,
  },
  {
    path: "user",
    loadChildren: () =>
      import("./manage-user/manage-user.module").then(
        (m) => m.ManageUserModule,
      ),
  },
  {
    path: "user/:id",
    loadChildren: () =>
      import("./manage-user/manage-user.module").then(
        (m) => m.ManageUserModule,
      ),
  },
  {
    path: "**",
    redirectTo: "main",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
