import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformComponent } from './platform/platform.component';
import { OptionsComponent } from './options/options.component';
import { ConstructionComponent } from './components/construction/construction.component';
import { ReferalComponent } from './referal/referal.component';
import { authGuard } from '../auth.guard';
import { ProgressComponent } from './progress/progress.component';
import { WithdrawStatusComponent } from './withdraw-status/withdraw-status.component';

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    children: [
      {
        path: '',
        component: ConstructionComponent,
      },
      {
        path: 'referral',
        component: ReferalComponent,
        canActivate: [authGuard],
      },
      {
        path: 'options',
        component: OptionsComponent,
        canActivate: [authGuard],
      },
      // {
      //   path: 'progress',
      //   component: ProgressComponent,
      // },
      {
        path: 'withdraws-status',
        component: WithdrawStatusComponent,
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
