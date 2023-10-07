import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissoComponent } from './listar-compromisso/listar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ServicoCompromisso } from './services/compromisso.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContatosService } from '../contatos/services/contatos.service';



@NgModule({
  declarations: [
    InserirCompromissoComponent,
    ListarCompromissoComponent,
    ExcluirCompromissoComponent,
    EditarCompromissoComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [ServicoCompromisso],
  
})
export class CompromissoModule { }
