import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnityRoutingModule } from './unity/unity-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<Type<UnityRoutingModule>> =>
      import('./platform/platform.module').then((m) => m.PlatformModule),
  },
  {
    path: 'unity',
    loadChildren: (): Promise<Type<UnityRoutingModule>> =>
      import('./unity/unity.module').then((m) => m.UnityModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
