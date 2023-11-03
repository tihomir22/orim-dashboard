import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform/platform.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConstructionComponent } from './construction/construction.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [PlatformComponent, ConstructionComponent, OptionsComponent],
  imports: [CommonModule, PlatformRoutingModule, NgxSpinnerModule],
})
export class PlatformModule {}
