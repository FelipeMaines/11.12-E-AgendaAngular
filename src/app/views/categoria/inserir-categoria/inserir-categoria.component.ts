import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormCategoriaViewModel } from '../model/forms-categoria.view-model';
import { CategoriaService } from '../service/categoriaService.service';
import { FormsCompromissoViewModel } from '../../compromisso/models/forms-compromisso.view.model';

@Component({
  selector: 'app-inserir-categoria',
  templateUrl: './inserir-categoria.component.html',
  styleUrls: ['./inserir-categoria.component.css']
})
export class InserirCategoriaComponent implements OnInit{
  form!: FormGroup
  categoria!: FormCategoriaViewModel

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private categoriaService: CategoriaService
  ) {}
  
  gravar(){
   
     if (this.form.invalid) {
      for(let erro of this.form.validate())
      {
        this.toastrService.warning(erro);
      }

      return;
    }
    this.categoria = this.form.value;

    

    this.categoriaService.inserir(this.categoria).subscribe({
      next: (contato: FormCategoriaViewModel) => this.processarSucesso(contato),
      error: (err: Error) => this.processarFalha(err)
    })
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  processarFalha(err: Error): void {
    this.toastrService.error(err.message, 'Error');
  }
  
  processarSucesso(categoria: FormCategoriaViewModel): void {
     this.toastrService.success(
      `A categoria "${categoria.titulo}" foi cadastrado com sucesso!`,
      'Sucesso'
    )
    
    this.router.navigate(['categoria/listar']);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
    })
  }
}
