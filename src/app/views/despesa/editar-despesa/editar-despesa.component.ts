import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListarCategoriaViewModel } from '../../categoria/model/listar-categoria.view-model';
import { FormDespesaViewModel } from '../models/forms-despesa.view.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../categoria/service/categoriaService.service';
import { DespesaService } from '../service/despesa.service';

@Component({
  selector: 'app-editar-despesa',
  templateUrl: './editar-despesa.component.html',
  styleUrls: ['./editar-despesa.component.css']
})
export class EditarDespesaComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private despesaService: DespesaService, private categoriaService: CategoriaService,private router: Router,
    private route: ActivatedRoute,
    ) {}

  form!: FormGroup;
  despesa!: FormDespesaViewModel;
  categorias: ListarCategoriaViewModel[] = [] 
  idSelecionado!: string | null;

  public gravar(){
    if(this.form.invalid){
      for(let err of this.form.validate()){
        this.toastr.warning(err);
      }

      return;
    }

    this.despesa = this.form.value;

    console.log(this.idSelecionado)

    this.despesaService.editar(this.despesa, this.idSelecionado!).subscribe(res => this.router.navigate(['despesa/listar']))
  }

  excluir(){
    this.despesaService.excluir(this.idSelecionado!).subscribe(res => this.router.navigate(['despesa/listar']));
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      formaPagamento: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required, Validators.min(1)]),
      categoriasSelecionadas: new FormControl([], [Validators.required]),
    });

    this.categoriaService.selecionarTodos().subscribe(res => {
      console.log(res)
      this.categorias = res;
    })

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    this.despesa = this.route.snapshot.data['despesa'];

    console.log(this.despesa);

    this.form.patchValue({
      ...this.despesa,
      data: this.despesa.data.toString().substring(0, 10),
    });
  }
}
