import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ListarDespesaComponent } from './listar-despesa/listar-despesa.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaService } from './service/despesa.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';
import { CategoriaService } from '../categoria/service/categoriaService.service';



@NgModule({
  declarations: [
    InserirDespesaComponent,
    ListarDespesaComponent,
    EditarDespesaComponent
  ],
  imports: [
    CommonModule, DespesaRoutingModule, NgSelectModule, ReactiveFormsModule
  ],
  providers: [DespesaService, CategoriaService]
})
export class DespesaModule { }
