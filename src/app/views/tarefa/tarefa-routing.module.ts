import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { TarefasService } from './services/tarefas.service';
import { ListarTarefaComponent } from './listar-tarefa/listar-tarefa.component';
import { combineLatest } from 'rxjs';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { FormsTarefaViewModel } from './models/forms-tarefa.view-model';

const listarTarefasResolver = () => {
  return inject(TarefasService).selecionarTodos();
};

const formsContatoResolver: ResolveFn<FormsTarefaViewModel> = (route: ActivatedRouteSnapshot) => {
    return inject(TarefasService).selecionarPorId(route.paramMap.get('id')!);
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },

  {
    path: 'listar',
    component: ListarTarefaComponent,
    resolve: { tarefas: listarTarefasResolver },
  },
  {
    path: 'inserir',
    component: InserirTarefaComponent,
  },
  {
    path: 'editar/:id',
    component: EditarTarefaComponent,
    resolve: {tarefa: formsContatoResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}