import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bicycles', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'bicycles',
    loadChildren: () => import('./pages/bicycles/bicycles.module').then( m => m.BicyclesPageModule)
  },
  {
    path: 'bicycle/:id',
    loadChildren: () => import('./pages/bicycle/bicycle.module').then( m => m.BicyclePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
