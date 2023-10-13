import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsContatoViewModel } from '../models/forms-contato.view-model';
import { ContatosService } from '../services/contatos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-contato',
  templateUrl: './editar-contato.component.html',
  styleUrls: ['./editar-contato.component.css'],
})
export class EditarContatoComponent {
  form!: FormGroup;
  contatoVM!: FormsContatoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contatoService: ContatosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      cargo: new FormControl(''),
      empresa: new FormControl(''),
    });

    this.contatoVM = this.route.snapshot.data['contato'];

    this.form.patchValue(this.contatoVM);
  }

  gravar() {

    if(this.form.invalid)
    {
      for(let err of this.form.validate())
      {
        this.toastr.warning(err);
      }
      return;
    }

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    this.contatoVM = this.form.value;

    this.contatoService
      .editar(this.idSelecionado!, this.contatoVM)
      .subscribe({
        next: (contato) => this.processarSucesso(contato),
        error: (erro) => this.processarFalha(erro),
      });
  }

  processarSucesso(contato: FormsContatoViewModel) {
    this.toastr.success(
      `O contato "${contato.nome}" foi editado com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/contatos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastr.error(erro.message, 'Error');
  }
}
