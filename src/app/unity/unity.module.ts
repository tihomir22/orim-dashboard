import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnityRoutingModule } from './unity-routing.module';
import { AutologinComponent } from './autologin/autologin.component';
import { SuccessMessageLoginComponent } from './success-message-login/success-message-login.component';

@NgModule({
  declarations: [AutologinComponent, SuccessMessageLoginComponent],
  imports: [CommonModule, UnityRoutingModule],
  providers: [AutologinComponent],
})
export class UnityModule {}
