import { Injectable } from '@angular/core';
import { FormsTarefaViewModel } from '../models/forms-tarefa.view-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-model';

@Injectable()
export class TarefasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/tarefas/';

  constructor(private http: HttpClient) {}

  public inserir(tarefa: FormsTarefaViewModel): Observable<FormsTarefaViewModel> {
    return this.http
      .post<any>(this.endpoint, tarefa, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarTarefaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarPorId(id: string): Observable<FormsTarefaViewModel> {
    return this.http
      .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public editar(id: string, tarefa: FormsTarefaViewModel){
    return this.http.put<any>(this.endpoint + id, tarefa, this.obterHeadersAutorizacao())
    .pipe(map((res) => res.dados));
  }

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}