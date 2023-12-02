import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform/platform.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConstructionComponent } from './components/construction/construction.component';
import { OptionsComponent } from './options/options.component';
import { ReferalComponent } from './referal/referal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ProgressComponent } from './progress/progress.component';
import { ParseJsonPipe } from '../standalone-comps/parse-json/parse-json.pipe';
import { WithdrawStatusComponent } from './withdraw-status/withdraw-status.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    PlatformComponent,
    ConstructionComponent,
    OptionsComponent,
    ReferalComponent,
    ProgressComponent,
    WithdrawStatusComponent,
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ParseJsonPipe,
    NgOptimizedImage,
    AgGridModule,
  ],
  providers: [DatePipe],
})
export class PlatformModule {}
