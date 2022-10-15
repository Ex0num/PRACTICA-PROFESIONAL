import { Component, OnInit } from '@angular/core';

import { getAuth, signOut } from "firebase/auth";
import { HomePage } from '../home/home.page';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { FirestoreService } from '../Servicios/firestore.service';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
})
export class LogedComponent implements OnInit {

  rango = "Usuario";

  public usuariosLeidos:any;
  public usuariosLeidosOrdenados:any;

  constructor(private routerRecieved:Router, public srvFirebase:FirestoreService) 
  {}


  async ngOnInit() 
  {
    const auth = getAuth();
    
    try
    {
      if (auth.currentUser.email != null)
      {
          if (auth.currentUser.email == "admin@admin.com")
          {
              this.rango = "Administrador";

              let  btnUpdateUser = document.getElementById("btn-subir-user");
              btnUpdateUser.removeAttribute("hidden");
          }
          else
          {
            let  btnUpdateUser = document.getElementById("btn-subir-user");
            btnUpdateUser.setAttribute("hidden","true");
          }
      }
    }
    catch(e)
    {
      this.routerRecieved.navigate(['/home']);
    }

    this.usuariosLeidos = await this.srvFirebase.leerDBUsuarios();
    this.usuariosLeidosOrdenados = this.usuariosLeidos.sort( (a,b)=> { if(a.nombre > b.nombre){return 1;}else{return -1}});
  }


  logOut()
  {
    const auth = getAuth();
    signOut(auth).then(() => 
    {
      // Sign-out successful.
      console.log("Cierre de sesión satisfactorio. Vuelva prontosss!");
      this.routerRecieved.navigate(['/home']);

    }).catch((error) => 
    {
      // An error happened.
      console.log(error);
    });
  }

  goToAltaUser()
  {
    this.routerRecieved.navigate(['/altausuario']);
  }
  
}
