import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'contatos',
    loadChildren: () => import('./views/contatos/contatos.module')
    .then(mod => mod.ContatosModule)
  },

  {
    path: 'compromisso',
    loadChildren: () => import('./views/compromisso/compromisso.module')
    .then(mod => mod.CompromissoModule)
  },

  {
    path: 'categoria',
    loadChildren: () => import('./views/categoria/categoria.module')
    .then(mod => mod.CategoriaModule)
  },
  {
    path: 'despesa',
    loadChildren: () => import('./views/despesa/despesa.module')
    .then(mod => mod.DespesaModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
