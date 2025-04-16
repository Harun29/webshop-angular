import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'checkout',
    pathMatch: 'full',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'profile',
    pathMatch: 'full',
    loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent),
  }
];
