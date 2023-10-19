import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { ListarDespesaViewModel } from "../models/listar-despesa.view.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormDespesaViewModel } from "../models/forms-despesa.view.model";
import { LocalStorageService } from "src/app/core/auth/services/local-storage.service";

@Injectable()
export class DespesaService {

    constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

    private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/despesas/';

    public selecionarTodos(): Observable<ListarDespesaViewModel[]>{
        return this.http.get<any>(this.endpoint).pipe(
            map(res => res.dados),
            catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
        )
    }

    public selecionarPorId(id: string): Observable<FormDespesaViewModel>{
        return this.http.get<any>(this.endpoint + id).pipe(
            map(res => (res.dados)),
            catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
        )
    }

    public inserir(despesa: FormDespesaViewModel){
        return this.http.post<any>(this.endpoint, despesa)
        .pipe(
            map(res => res.dados),
            catchError(err => this.processarErroHttp(err))
        )
    }
    
    public editar(despesa: FormDespesaViewModel, id: string){
        return this.http.put<any>(this.endpoint + id, despesa)
        .pipe(
            map(res => res.dados),
            catchError(err => this.processarErroHttp(err))
        )
    }

    public excluir(id: string): Observable<any> {
        return this.http.delete(this.endpoint + id)
          .pipe(
            catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
          );
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
}