import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform/platform.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConstructionComponent } from './components/construction/construction.component';
import { OptionsComponent } from './options/options.component';
import { ReferalComponent } from './referal/referal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlatformComponent,
    ConstructionComponent,
    OptionsComponent,
    ReferalComponent,
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PlatformModule {}
