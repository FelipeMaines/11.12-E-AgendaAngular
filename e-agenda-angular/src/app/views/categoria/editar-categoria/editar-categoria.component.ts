import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ListarCategoriaComponent } from '../listar-categoria/listar-categoria.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormCategoriaViewModel } from '../model/forms-categoria.view-model';
import { ListarCategoriaViewModel } from '../model/listar-categoria.view-model';
import { CategoriaService } from '../service/categoriaService.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private categoriaService: CategoriaService, private router: Router,) { }

  form!: FormGroup
  categoria!: ListarCategoriaViewModel;
  idSelecionado: string | null = null;

  gravar() {
    this.categoriaService.editar(this.form.value, this.idSelecionado!).subscribe(res => this.router.navigate(['compromisso/listar']))
  }

  excluir(){
    this.categoriaService.excluir(this.idSelecionado!).subscribe(res => this.router.navigate(['compromisso/listar']))
  }

  campoEstaInvalido(nome: string) {
    return this.form.get(nome)!.touched && this.form.get(nome)!.invalid;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: new FormControl('', [Validators.required])
    })

    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    this.categoria = this.route.snapshot.data['categoria'];

    console.log('ngoninit')
    console.log(this.categoria);

    this.form.patchValue(this.categoria);
  }
}
