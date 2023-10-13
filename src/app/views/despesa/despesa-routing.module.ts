import { Inject, NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { ListarDespesaComponent } from "./listar-despesa/listar-despesa.component";
import { InserirDespesaComponent } from "./inserir-despesa/inserir-despesa.component";
import { EditarDespesaComponent } from "./editar-despesa/editar-despesa.component";
import { DespesaService } from "./service/despesa.service";
import { ListarDespesaViewModel } from "./models/listar-despesa.view.model";
import { FormDespesaViewModel } from "./models/forms-despesa.view.model";

const listarDespesasResolve: ResolveFn<ListarDespesaViewModel[]> = ()=> {
    return inject(DespesaService).selecionarTodos()
}

const formDespesaResolve : ResolveFn<FormDespesaViewModel> = (route: ActivatedRouteSnapshot) => {
    return inject(DespesaService).selecionarPorId(route.paramMap.get('id')!)
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
    },
    {
        path: 'listar',
        component: ListarDespesaComponent,
        resolve: {despesas: listarDespesasResolve}
    },

    {
        path: 'inserir',
        component: InserirDespesaComponent,
    }
    ,
    
    {
        path: 'editar/:id',
        component: EditarDespesaComponent,
        resolve: {despesa: formDespesaResolve}
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class DespesaRoutingModule {

}
