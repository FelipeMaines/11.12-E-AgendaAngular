export class ListarCompromissoViewModel {
    assunto: string;
    data: string;
    horaInicio: string;
    horaTermino: string;
    nomeContato: string;
    contatoId?: number;
    id: string;

    constructor(assunto: string, Data: string, horaInicio: string,
        horaTermino: string,
        nomeContato: string,
        id: string){

        this.assunto = assunto,
        this.data = Data,
        this.horaInicio = horaInicio,
        this.horaTermino = horaTermino,
        this.nomeContato = nomeContato,
        this.id = id
    }
}