import { Component, OnInit } from '@angular/core';
import { ListarTarefaViewModel } from '../models/listar-tarefas.view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.css']
})
export class ListarTarefaComponent implements OnInit {
  tarefas: ListarTarefaViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tarefas = this.route.snapshot.data['tarefas'];
  }
}
