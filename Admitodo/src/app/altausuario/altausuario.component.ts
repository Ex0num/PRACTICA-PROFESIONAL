import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogedComponent } from '../loged/loged.component';
import { FirestoreService } from '../Servicios/firestore.service';
import { ScannerService } from '../Servicios/scanner.service';

@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.scss'],
})
export class AltausuarioComponent implements OnInit {

  constructor(private routerRecieved:Router, public srvFirebase:FirestoreService, public scanner:ScannerService) { }

  ngOnInit() {}

  nombre:string = "";
  apellido:string;
  mail:string;
  dni:number;
  clave:string;
  claveConfirm:string;
  fotoFile:any;

  errorTextoMostrado = "";
  error = false;

  // lectura:any;
  contenido:any;

  volver()
  {
    this.routerRecieved.navigate(['/loged']);
    LogedComponent.prototype.usuariosLeidos = this.srvFirebase.leerDBUsuarios();
  }

  // escanearDNI()
  // {
  //   this.scanner.test().then((a)=>{
  //     this.scanner.stopScan();
  //     this.lectura = a;
  //     console.log(this.lectura);
  //   });

  // }

  escanearDNI()
  {
    this.scanner.test().then((a)=>
    {
      this.contenido = a.split('@');
      this.apellido = this.contenido[1].charAt(0) + this.contenido[1].slice(1).toLocaleLowerCase();
      this.nombre  = this.contenido[2].charAt(0) + this.contenido[2].slice(1).toLocaleLowerCase();
      this.dni  = parseInt(this.contenido[4]);
      this.scanner.stopScan();
    });
  }

  async subirUsuario()
  {

    if (this.clave == this.claveConfirm && this.nombre != "" && this.apellido != "" && this.mail != "" && this.clave != "" && this.dni != undefined)
    {
      let estaRegistrado = await this.srvFirebase.userEstaRegistrado(this.mail);

      if (estaRegistrado == false)
      {
        this.srvFirebase.subirUsuarioDB(this.nombre, this.apellido, this.mail, this.dni, this.clave, this.fotoFile);
        this.nombre = "";
        this.apellido = "";
        this.mail = "";
        this.dni = undefined;
        this.clave = "";
        this.claveConfirm = "";

        this.routerRecieved.navigate(['/loged']);
      }
      else
      {
        this.mostrarError("El usuario ya está registrado.");
      }
    }
    else
    {
      if (this.clave != this.claveConfirm)
      {
        this.mostrarError("Las claves no coinciden.");
      }
      else
      {
        this.mostrarError("Los datos están incompletos.");
      }
    }
    
  }

  fotoSubida(event:any)
  {
    let fileList = event.target.files;
    this.fotoFile = fileList[0];
    console.log(this.fotoFile);
  }

  mostrarError(errorRecibido:string)
  {
    this.errorTextoMostrado = errorRecibido;
    this.error = true;

    setTimeout(() => { this.error = false;}, 2000);
  }


}
