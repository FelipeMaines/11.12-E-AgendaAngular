import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { FormsCompromissoViewModel } from "../../compromisso/models/forms-compromisso.view.model";
import { Observable, map } from "rxjs";
import { ListarCompromissoViewModel } from "../../compromisso/models/listar-compromissos.view.model";
import { VisualizarCompromissoViewModel } from "../../compromisso/models/visualizar-compromisso.view-model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class ServicoCompromisso{

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

    private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/compromissos/';

    public inserir(
        compromisso: FormsCompromissoViewModel
      ): Observable<FormsCompromissoViewModel> {
        return this.http.post<any>(
          this.endpoint,
          compromisso,
          this.obterHeadersAutorizacao()
        );
      }
    
      public editar(id: string, compromisso: FormsCompromissoViewModel) {
        return this.http
          .put<any>(this.endpoint + id, compromisso, this.obterHeadersAutorizacao())
          .pipe(map((res) => res.dados));
      }
    
      public excluir(id: string): Observable<any> {
        return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao());
      }
    
      public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
        return this.http
          .get<any>(this.endpoint, this.obterHeadersAutorizacao())
          .pipe(map((res) => res.dados));
      }
    
      public selecionarPorId(id: string): Observable<FormsCompromissoViewModel> {
        return this.http
          .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
          .pipe(map((res) => res.dados));
      }
    
      public selecionarContatoCompletoPorId(
        id: string
      ): Observable<VisualizarCompromissoViewModel> {
        return this.http
          .get<any>(
            this.endpoint + 'visualizacao-completa/' + id,
            this.obterHeadersAutorizacao()
          )
          .pipe(map((res) => res.dados));
      }
    
    
      private obterHeadersAutorizacao() {
        const token = this.localStorageService.obterDadosLocaisSalvos()?.chave;

        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        };
    }
}
