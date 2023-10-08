import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { InserirContatoComponent } from './views/contatos/inserir-contato/inserir-contato.component';
import { ListarContatosComponent } from './views/contatos/listar-contatos/listar-contatos.component';
import { EditarContatoComponent } from './views/contatos/editar-contato/editar-contato.component';
import { ExcluirContatoComponent } from './views/contatos/excluir-contato/excluir-contato.component';
import { ListarCompromissoComponent } from './views/compromisso/listar-compromisso/listar-compromisso.component';
import { InserirCompromissoComponent } from './views/compromisso/inserir-compromisso/inserir-compromisso.component';
import { EditarCompromissoComponent } from './views/compromisso/editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './views/compromisso/excluir-compromisso/excluir-compromisso.component';
import { FormsContatoViewModel } from './views/contatos/models/forms-contato.view-model';
import { ContatosService } from './views/contatos/services/contatos.service';
import { ListarCompromissoViewModel } from './views/compromisso/models/listar-compromissos.view.model';
import { ListarContatoViewModel } from './views/contatos/models/listar-contato.view-model';
import { VisualizarContatoViewModel } from './views/contatos/models/visualizar-contato.view-model';

const listarContatosResolver: ResolveFn<ListarContatoViewModel[]> = () => {
  return inject(ContatosService).selecionarTodos();
}

const formsContatoResolver: ResolveFn<FormsContatoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(ContatosService).selecionarPorId(route.paramMap.get('id')!);
}

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(ContatosService).selecionarContatoCompletoPorId(
    route.paramMap.get('id')!
  );
};


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

  // Contatos
  {
    path: 'contatos/inserir',
    component: InserirContatoComponent,
  },
  {
    path: 'contatos/editar/:id',
    component: EditarContatoComponent,
    resolve: {contato: formsContatoResolver},
  },
  {
    path: 'contatos/excluir/:id',
    component: ExcluirContatoComponent,
    resolve: {contato: visualizarContatoResolver}
  },
  {
    path: 'contatos/listar',
    component: ListarContatosComponent,
    resolve: {contatos: listarContatosResolver},
  },

  {
    path: 'compromisso/listar',
    component: ListarCompromissoComponent,
  },
  {
    path: 'compromisso/inserir',
    component: InserirCompromissoComponent,
  },
  {
    path: 'compromisso/editar/:id',
    component: EditarCompromissoComponent,
  },
  {
    path: 'compromisso/excluir/:id',
    component: ExcluirCompromissoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
