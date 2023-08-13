import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform/platform.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [PlatformComponent],
  imports: [CommonModule, PlatformRoutingModule, NgxSpinnerModule],
})
export class PlatformModule {}
