import { Component, OnInit } from '@angular/core';
import { ListarDespesaViewModel } from '../models/listar-despesa.view.model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-despesa',
  templateUrl: './listar-despesa.component.html',
  styleUrls: ['./listar-despesa.component.css']
})
export class ListarDespesaComponent implements OnInit{

  constructor(private route: ActivatedRoute, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.route.data.pipe(map((res) => res['despesas'])).subscribe(
      {
        next: (contatos) => this.processarSucesso(contatos),
        error: (err) => this.processarFalha(err)
      }
    )
  }
  despesas: ListarDespesaViewModel[] = []

  processarSucesso(despesas: ListarDespesaViewModel[]) {
    this.despesas = despesas;
    console.log(despesas);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
