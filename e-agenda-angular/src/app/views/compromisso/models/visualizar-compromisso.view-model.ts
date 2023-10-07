export class VisualizarCompromissoViewModel {
    assunto: string;
    tipoLocal: string;
    link: string;
    local: string;
    data: string;
    horaInicio: string;
    horaTermino: string;
    contatoId?: number;


    constructor(assunto: string, TipoLocal: string, Local: string ,link: string, Data: string, HotaInicio: string, HoraTermino: string, contatoId?: number){
        this.assunto = assunto,
        this.tipoLocal = TipoLocal,
        this.link = link,
        this.local = Local,
        this.data = Data,
        this.horaInicio = HotaInicio,
        this.horaTermino = HoraTermino,
        this.contatoId = contatoId
    }
}