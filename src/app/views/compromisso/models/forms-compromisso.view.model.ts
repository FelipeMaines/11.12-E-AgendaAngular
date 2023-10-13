export class FormsCompromissoViewModel {
    assunto: string;
    tipoLocal: string;
    link: string;
    local: string;
    data: string;
    horaInicio: string;
    horaTermino: string;
    contatoId?: string;


    constructor(assunto: string, TipoLocal: string, Local: string ,link: string, Data: string, HotaInicio: string, HoraTermino: string, contatoId?: string){
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