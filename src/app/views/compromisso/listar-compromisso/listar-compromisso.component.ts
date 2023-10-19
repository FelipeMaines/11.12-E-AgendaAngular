import { Component, OnInit } from '@angular/core';
import { ServicoCompromisso } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../models/listar-compromissos.view.model';
import { ActivatedRoute } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-listar-compromisso',
  templateUrl: './listar-compromisso.component.html',
  styleUrls: ['./listar-compromisso.component.css']
})
export class ListarCompromissoComponent implements OnInit{

  constructor(private route: ActivatedRoute, private compromissoService: ServicoCompromisso){}
  listaCompromisso: ListarCompromissoViewModel[] = []

  ngOnInit(): void {
    this.listaCompromisso = this.route.snapshot.data['listaCompromisso'];
    console.log(this.listaCompromisso);
  }

  selecionarCompromissosPassados(){
    this.compromissoService.selecionarPassados().subscribe((res) => {
      console.log(res);
      this.listaCompromisso = res;
    })}

}
