export class Foto 
{
    emisor:string;
    fecha:string;
    foto:string;
    hora:string;
    like:any[];

    constructor(emisorRecibido:string, fechaRecibida:string, fotoRecibida:string, horaRecibida:string, likeRecibidos:any[])
    {
        this.emisor = emisorRecibido;
        this.fecha = fechaRecibida;
        this.foto = fotoRecibida;
        this.hora = horaRecibida;
        this.like = likeRecibidos;
    }

}
