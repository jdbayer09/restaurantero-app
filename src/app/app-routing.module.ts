import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, UrlSegment, Route, CanMatchFn } from '@angular/router';
import { AuthService } from './services/security/auth.service';

const AuthenticationGuard: CanMatchFn = 
  () => 
  inject(AuthService).isAuthenticated();

const routes: Routes = [
  {
    path: '',
    redirectTo: 'z',
    pathMatch: 'full'
  },
  {
    path: 'z',
    loadChildren: () => import('./pages/zone/zone.module').then( m => m.ZonePageModule),
    canMatch: [AuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'z'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
