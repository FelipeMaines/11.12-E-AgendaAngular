import { NgModule, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from "@angular/router";
import { EditarCompromissoComponent } from "./editar-compromisso/editar-compromisso.component";
import { ExcluirCompromissoComponent } from "./excluir-compromisso/excluir-compromisso.component";
import { InserirCompromissoComponent } from "./inserir-compromisso/inserir-compromisso.component";
import { ListarCompromissoComponent } from "./listar-compromisso/listar-compromisso.component";
import { FormsCompromissoViewModel } from "./models/forms-compromisso.view.model";
import { ListarCompromissoViewModel } from "./models/listar-compromissos.view.model";
import { ServicoCompromisso } from "./services/compromisso.service";

const listarCompromissosResolver: ResolveFn<ListarCompromissoViewModel[]> = () => {
    return inject(ServicoCompromisso).selecionarTodos();
}

const formsCompromissoResolver: ResolveFn<FormsCompromissoViewModel> = (route: ActivatedRouteSnapshot) => {
    return inject(ServicoCompromisso).selecionarPorId(route.paramMap.get('id')!);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'listar',
        pathMatch: 'full',
    },
    {
        path: 'listar',
        component: ListarCompromissoComponent,
        resolve: { listaCompromisso: listarCompromissosResolver }
    },
    {
        path: 'inserir',
        component: InserirCompromissoComponent,
    },
    {
        path: 'editar/:id',
        component: EditarCompromissoComponent,
        resolve: { compromisso: formsCompromissoResolver }
    },
    {
        path: 'excluir/:id',
        component: ExcluirCompromissoComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CompromissoRoutingModule {

}