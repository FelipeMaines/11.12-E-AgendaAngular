import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDespesaViewModel } from '../models/forms-despesa.view.model';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from '../service/despesa.service';
import { ListarCategoriaViewModel } from '../../categoria/model/listar-categoria.view-model';
import { CategoriaService } from '../../categoria/service/categoriaService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent implements OnInit{
  form!: FormGroup;
  despesa!: FormDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [] 

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private despesaService: DespesaService, private categoriaService: CategoriaService,private route: Router) {}

  public gravar(){
    if(this.form.invalid){
      for(let err of this.form.validate()){
        this.toastr.warning(err);
      }

      return;
    }

    this.despesa = this.form.value;

    console.log(this.despesa);

    this.despesaService.inserir(this.despesa).subscribe(res => this.route.navigate(['despesa/listar']));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      formaPagamento: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(1)]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.categoriaService.selecionarTodos().subscribe(res => this.categorias = res)
  }

}
