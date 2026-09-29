import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: async () => {
      const module = await import('./components/home/home');
      return module.Home;
    },
  },
  {
    path: 'login',
    loadComponent: async () => {
      const module = await import('./components/login/login');
      return module.Login;
    },
  },
  {
    path: 'register',
    loadComponent: async () => {
      const module = await import('./components/register/register');
      return module.Register;
    },
  },
  {
    path: 'reset-password',
    loadComponent: async () => {
      const module = await import('./components/reset-password/reset-password');
      return module.ResetPassword;
    },
  },
];
