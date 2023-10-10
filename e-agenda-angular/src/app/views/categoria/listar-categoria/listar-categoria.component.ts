import { Component, OnInit } from '@angular/core';
import { ListarCategoriaViewModel } from '../model/listar-categoria.view-model';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit{
  
  constructor(private route: ActivatedRoute, private toastrService: ToastrService) {}

  categorias: ListarCategoriaViewModel[] = [];

  ngOnInit(): void {
    this.route.data.pipe(map(res => res['categorias'])).subscribe(
      {
        next: (categorias) => this.processarSucesso(categorias),
        error: (err) => this.processarFalha(err)
      }
    )
  }
  processarSucesso(categorias: ListarCategoriaViewModel[]) {
    this.categorias = categorias;
    console.log(categorias);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
