import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../Servicios/firestore.service';

@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.scss'],
})
export class AltausuarioComponent implements OnInit {

  constructor(private routerRecieved:Router, public srvFirebase:FirestoreService) { }

  ngOnInit() {}

  nombre:string;
  apellido:string;
  mail:string;
  dni:number;
  clave:string;
  fotoFile:any;

  volver()
  {
    this.routerRecieved.navigate(['/loged']);
  }

  escanearDNI()
  {
    
  }

  subirUsuario()
  {
   
    this.srvFirebase.subirUsuarioDB(this.nombre, this.apellido, this.mail, this.dni, this.clave, this.fotoFile);
  }

  fotoSubida(event:any)
  {
    let fileList = event.target.files;
    console.log(fileList);
  }


}
