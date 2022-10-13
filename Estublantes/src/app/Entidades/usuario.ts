export class Usuario 
{
    public mail:string|undefined;
    public password:string|undefined;

    constructor() 
    {

    }

    constructor_2(mailRecibido:string, passwordRecibida:string) 
    {
        let resultadoValidacion = Usuario.validarUsuario(mailRecibido, passwordRecibida);

        if (resultadoValidacion == true)
        {
            this.mail = mailRecibido;
            this.password = passwordRecibida;
        }   
    }

    public static validarUsuario(mailRecibido:string, passwordRecibida:string):boolean
    {
        let resultado = false;

        if (mailRecibido != null && mailRecibido != undefined && passwordRecibida!= null && passwordRecibida != undefined)
        {
            resultado = true;
        }   
        
        return resultado;
    }

    public static validarPassword(passwordRecibida:string): boolean
    {
        if (passwordRecibida != null && passwordRecibida != undefined && passwordRecibida.length > 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public static validarMail(mailRecibido:string): boolean
    {

        let contieneArroba = false;
        
        for (let i = 0; i < mailRecibido.length; i++) 
        {
            if (mailRecibido[i] == "@")
            {
                contieneArroba = true;
            }
        }

        if (mailRecibido != null && mailRecibido != undefined && mailRecibido.length > 5 && contieneArroba == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
