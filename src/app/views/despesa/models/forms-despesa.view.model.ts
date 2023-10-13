import { FormaPagamentoEnum } from "./forma-pagamento.enum";

export class FormDespesaViewModel {
    descricao: string;
    data: string;
    formaPagamento: FormaPagamentoEnum;
    valor: number;
    categorias: string[];

    constructor(Descricao: string, Data: string, FormaPagamento: FormaPagamentoEnum, Valor: number, Despesas: string[]) {
            this.descricao = Descricao,
            this.data = Data,
            this.formaPagamento = FormaPagamento,
            this.valor = Valor,
            this.categorias = Despesas
    }
}