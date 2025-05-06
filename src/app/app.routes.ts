import { Routes } from '@angular/router';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'checkout',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
];
