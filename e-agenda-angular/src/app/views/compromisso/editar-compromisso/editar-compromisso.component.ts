import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view.model';
import { ContatosService } from '../../contatos/services/contatos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicoCompromisso } from '../services/compromisso.service';
import { ListarContatoViewModel } from '../../contatos/models/listar-contato.view-model';
import { group } from '@angular/animations';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent implements OnInit{
  form!: FormGroup;
  compromisso!: FormsCompromissoViewModel;
  idSelecionado: string | null = null;
  contatos: ListarContatoViewModel[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private compromissoService: ServicoCompromisso,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  editar(){
    this.compromisso = this.form.value;
    console.log(this.compromisso);
    

    this.compromissoService.editar(this.idSelecionado!, this.compromisso).subscribe(res => this.router.navigate(['compromisso/listar']));
  }

  excluir(){
    this.compromissoService.excluir(this.idSelecionado!).subscribe(res => this.router.navigate(['compromisso/listar']));
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      assunto: new FormControl('', [Validators.required]),
      tipoLocal: new FormControl('', [Validators.required, Validators.email]),
      link: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaTermino: new FormControl('', [Validators.required]),
      contatoId: new FormControl('',)
    })

    this.contatoService.selecionarTodos().subscribe(res => {
      this.contatos = res;
    })
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if(!this.idSelecionado) return

    this.compromissoService.selecionarPorId(this.idSelecionado).subscribe(res => {
      this.form.patchValue(res);
      console.log(res);
      this.form.get('data')?.setValue(res.data.toString().substring(0, 10))
    });
  }

  
}
