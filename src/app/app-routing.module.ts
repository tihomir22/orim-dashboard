import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformModule } from './platform/platform.module';
import { UnityModule } from './unity/unity.module';
import { LinkerComponent } from './standalone-comps/linker/linker.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<Type<PlatformModule>> =>
      import('./platform/platform.module').then((m) => m.PlatformModule),
  },
  {
    path: 'unity',
    loadChildren: (): Promise<Type<UnityModule>> =>
      import('./unity/unity.module').then((m) => m.UnityModule),
  },
  {
    path: 'DELETE_DATA/:id',
    component: LinkerComponent,
  },
  {
    path: 'REFERRAL_CODE/:id',
    component: LinkerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
