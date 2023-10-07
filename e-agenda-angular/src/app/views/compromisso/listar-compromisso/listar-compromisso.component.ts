import { Component, OnInit } from '@angular/core';
import { ServicoCompromisso } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../models/listar-compromissos.view.model';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html',
  styleUrls: ['./listar-compromisso.component.css']
})
export class ListarCompromissoComponent implements OnInit{

  constructor(private servicoCompromisso: ServicoCompromisso){}
  listaCompromisso: ListarCompromissoViewModel[] = []

  ngOnInit(): void {
    this.servicoCompromisso.selecionarTodos().subscribe((res) => {
      this.listaCompromisso = res;
      console.log(res);
      console.log(this.listaCompromisso);
    })
  }
}
