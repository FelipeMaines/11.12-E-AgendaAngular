import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../services/contatos.service';
import { ListarContatoViewModel } from '../models/listar-contato.view-model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-contatos',
  templateUrl: './listar-contatos.component.html',
  styleUrls: ['./listar-contatos.component.css'],
})
export class ListarContatosComponent implements OnInit {
  contatos: ListarContatoViewModel[] = [];

  constructor(private route: ActivatedRoute, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['contatos'])).subscribe(
      {
        next: (contatos) => this.processarSucesso(contatos),
        error: (err) => this.processarFalha(err)
      }
    )
  }

  processarSucesso(contatos: ListarContatoViewModel[]) {
    this.contatos = contatos;
    console.log(contatos);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
