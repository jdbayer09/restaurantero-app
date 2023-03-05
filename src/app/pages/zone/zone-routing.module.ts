import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonePage } from './zone.page';

const routes: Routes = [
  {
    path: '',
    component: ZonePage,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'ajustes',
        loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'mesas',
        loadChildren: () => import('./mesas/mesas.module').then( m => m.MesasPageModule)
      },
      {
        path: 'reservas',
        loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasPageModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'inicio'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonePageRoutingModule {}
