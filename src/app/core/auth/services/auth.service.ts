import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { RegistrarUsuarioViewModel } from "../models/registrar-usuario.view-model";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { TokenViewModel } from "../models/token.view-model";
import { end } from "@popperjs/core";
import { AutenticarUsuarioViewModel } from "../models/autenticar-usuario.view-model";

@Injectable()
export class AuthService {
    private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

    private endpointRegistrar: string = this.endpoint + 'registrar';
    private endpointLogin: string = this.endpoint + 'autenticar';

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService
      ) {}

      public registrar(usuario: RegistrarUsuarioViewModel): Observable<TokenViewModel>{
        return this.http.post<any>(this.endpointRegistrar, usuario).pipe(
            map( res => res.dados),
            tap( res => this.localStorage.salvarDadosLocaisUsuario(res)),
            catchError(err => this.processarErroHttp(err))
        )
      }

      public login(usuario: AutenticarUsuarioViewModel){
        return this.http.post<any>(this.endpointLogin, usuario).pipe(
            map( res => res.dados),
            tap( (res: TokenViewModel) => this.localStorage.salvarDadosLocaisUsuario(res)),
            catchError(err => this.processarErroHttp(err))
        )
      }

      private processarErroHttp(erro: HttpErrorResponse) {
        let mensagemErro = '';
    
        if (erro.status == 0)
          mensagemErro = 'Ocorreu um erro ao processar a requisição.';
        if (erro.status == 401)
          mensagemErro =
            'O usuário não está autorizado. Efetue login e tente novamente.';
        else mensagemErro = erro.error?.erros[0];
    
        return throwError(() => new Error(mensagemErro));
      }
}