import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { authGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'contatos',
    loadChildren: () => import('./views/contatos/contatos.module')
      .then(mod => mod.ContatosModule),
    canActivate: [authGuard],
  },

  {
    path: 'compromisso',
    loadChildren: () => import('./views/compromisso/compromisso.module')
      .then(mod => mod.CompromissoModule),
    canActivate: [authGuard],
  },

  {
    path: 'categoria',
    loadChildren: () => import('./views/categoria/categoria.module')
      .then(mod => mod.CategoriaModule),
    canActivate: [authGuard],
  },
  {
    path: 'despesa',
    loadChildren: () => import('./views/despesa/despesa.module')
      .then(mod => mod.DespesaModule),
    canActivate: [authGuard],
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./views/tarefa/tarefa.module')
      .then(mod => mod.TarefaModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
