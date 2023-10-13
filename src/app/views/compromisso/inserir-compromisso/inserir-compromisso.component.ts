import { Component, OnInit } from '@angular/core';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view.model';
import { ServicoCompromisso } from '../services/compromisso.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ToastrService } from 'ngx-toastr';

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
    private contatoService: ContatosService,
    private toastrService: ToastrService
  ) {}


  ngOnInit(): void {

    this.contatoService.selecionarTodos().subscribe(res => {
      this.contatos = res;
    })

    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl('', [Validators.required]),
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

    if (this.form.invalid) {
      for(let erro of this.form.validate())
      {
        this.toastrService.warning(erro);
      }
    }

    this.compromisso = this.form.value;

    this.compromiossoService.inserir(this.compromisso).subscribe((res) => {
      this.router.navigate(['compromisso/listar'])
    });
  }
}