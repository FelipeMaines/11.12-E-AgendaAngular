import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { VisualizarContatoViewModel } from '../models/visualizar-contato.view-model';
import { LocalStorageService } from 'src/app/core/auth/services/local-storage.service';

@Injectable()
export class ContatosService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/contatos/';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  public inserir(contato: FormsContatoViewModel): Observable<FormsContatoViewModel> {
    return this.http.post<any>(this.endpoint, contato).pipe(
      map((res) => res.dados),
      catchError((err) => this.processarErroHttp(err))
    )
  }

  processarErroHttp(err: HttpErrorResponse) {
    let msgErro = '';

    if (err.status == 0)
      msgErro = "Ocorreu um erro ao processar a requisicao";
    else if (err.status == 401)
      msgErro = "O usuario nao esta autorizado! Efetue login e tente novamente";

    else
      msgErro = err.error?.erros[0];

    return throwError(() => new Error(msgErro));
  }

  public editar(id: string, contato: FormsContatoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, contato)
      .pipe(map((res) => res.dados),
        catchError((err) => this.processarErroHttp(err)));
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id)
      .pipe(
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarContatoViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarPorId(id: string): Observable<FormsContatoViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

  public selecionarContatoCompletoPorId(
    id: string
  ): Observable<VisualizarContatoViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id
      )
      .pipe(map((res) => res.dados), 
      catchError((err: HttpErrorResponse) => this.processarErroHttp(err)));
  }

}
