import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [
    PlatformComponent,
    ConstructionComponent,
    OptionsComponent,
    ReferalComponent,
    ProgressComponent,
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
  ],
})
export class PlatformModule {}
