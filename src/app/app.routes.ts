import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  // {
  //   path: 'cart',
  //   pathMatch: 'full',
  //   loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
  // }
];
