import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';
import { CategoriaService } from './service/categoriaService.service';




@NgModule({
  declarations: [
    InserirCategoriaComponent,
    ListarCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [CategoriaService]
})
export class CategoriaModule { }
