export class ListarDespesaViewModel {
    id: string;
    descricao: string;
    data: string;
    formaPagamento: string;
    valor: number;
    despesas: string[];

    constructor(Descricao: string, Data: string, FormaPagamento: string, Valor: number, Despesas: string[], Id: string) {
            this.id = Id;
            this.descricao = Descricao,
            this.data = Data,
            this.formaPagamento = FormaPagamento,
            this.valor = Valor,
            this.despesas = Despesas
    }
}