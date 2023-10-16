import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';
import { EditarTarefaComponent } from './editar-tarefa/editar-tarefa.component';
import { TarefasRoutingModule } from './tarefa-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import 'src/app/extensions/form-group.extension';
import { TarefasService } from './services/tarefas.service';
import { ListarTarefaComponent } from './listar-tarefa/listar-tarefa.component';



@NgModule({
  declarations: [
    InserirTarefaComponent,
    EditarTarefaComponent,
    ListarTarefaComponent
  ],
  imports: [
    CommonModule,
    TarefasRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbTooltipModule,
  ],
  providers: [TarefasService],
})
export class TarefaModule { }
