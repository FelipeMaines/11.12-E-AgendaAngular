import { Component, OnInit } from '@angular/core';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view.model';
import { ServicoCompromisso } from '../services/compromisso.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatosService } from '../../contatos/services/contatos.service';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent implements OnInit{
  compromisso!: FormsCompromissoViewModel;
  contatos: ListarContatoViewModel[] = [];
  form!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private compromiossoService: ServicoCompromisso,
    private router: Router,
    private contatoService: ContatosService
  ) {}


  ngOnInit(): void {

    this.contatoService.selecionarTodos().subscribe(res => {
      this.contatos = res;
    })

    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl('', [Validators.required, Validators.email]),
      link: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      contatoid: new FormControl('',)
  })}

  campoEstaInvalido(nome: string){
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }
  
  gravar(){
    this.compromisso = this.form.value;
    console.log(this.compromisso);

    console.log(this.compromisso)

    this.compromiossoService.inserir(this.compromisso).subscribe((res) => {
      console.log(res);

      this.router.navigate(['compromisso/listar'])
    });
  }
}