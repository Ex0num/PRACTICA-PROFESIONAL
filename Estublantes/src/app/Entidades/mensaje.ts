export class Mensaje 
{
    username:string;
    texto:string;
    horaActual:string;
    fechaActual:string;

    constructor (usuarioRecibido:string, textoRecibido:string)
    {
        this.username =  usuarioRecibido;
        this.texto = textoRecibido;
        this.horaActual = this.getHoraActual();
        this.fechaActual = this.getFechaActual();
    }

    private getHoraActual()
    {
        let horaActualCalculada = new Date();
        let horaString = horaActualCalculada.toLocaleTimeString();
        return horaString;
    }

    private getFechaActual()
    {
        let horaActualCalculada = new Date();
        let fechaString = horaActualCalculada.toLocaleDateString();
        return fechaString;
    }
}


