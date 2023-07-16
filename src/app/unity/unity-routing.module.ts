import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutologinComponent } from './autologin/autologin.component';
import { SuccessMessageLoginComponent } from './success-message-login/success-message-login.component';

const routes: Routes = [
  {
    path: 'autologin/:frameworkId',
    component: AutologinComponent,
  },
  {
    path: 'success-message-login',
    component: SuccessMessageLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnityRoutingModule {}
