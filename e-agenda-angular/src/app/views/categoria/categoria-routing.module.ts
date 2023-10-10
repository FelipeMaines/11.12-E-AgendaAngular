import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { InserirCategoriaComponent } from "./inserir-categoria/inserir-categoria.component";
import { ListarCategoriaComponent } from "./listar-categoria/listar-categoria.component";
import { EditarCategoriaComponent } from "./editar-categoria/editar-categoria.component";
import { ListarCategoriaViewModel } from "./model/listar-categoria.view-model";
import { CategoriaService } from "./service/categoriaService.service";
import { FormCategoriaViewModel } from "./model/forms-categoria.view-model";

const listarCategoriaResolve: ResolveFn<ListarCategoriaViewModel[]> = () => {
    return inject(CategoriaService).selecionarTodos();
}

const formCategoriaResolve: ResolveFn<FormCategoriaViewModel> = (route: ActivatedRouteSnapshot) => {
    return inject(CategoriaService).selecionarPorId(route.paramMap.get('id')!)
}


const routes: Routes = [
    {
        path: 'listar',
        redirectTo: 'listar',
        pathMatch: 'full',
    },
    {
        path: 'inserir',
        component: InserirCategoriaComponent,
    },
    {
        path: 'listar',
        component: ListarCategoriaComponent,
        resolve: {categorias: listarCategoriaResolve}
    },
    {
        path: 'editar/:id',
        component: EditarCategoriaComponent,
        resolve: {categoria: formCategoriaResolve}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CategoriaRoutingModule {

}