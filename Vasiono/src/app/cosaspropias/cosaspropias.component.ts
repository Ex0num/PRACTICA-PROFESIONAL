import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../Servicios/firestore.service';
import { PhotoService } from '../Servicios/photo.service';

@Component({
  selector: 'app-cosaspropias',
  templateUrl: './cosaspropias.component.html',
  styleUrls: ['./cosaspropias.component.scss'],
})
export class CosaspropiasComponent implements OnInit {

  constructor(public routerRecieved:Router, public authSrv:FirestoreService, public fotoSrv:PhotoService) { }

  public cosasFeasDelUser;
  public cosasLindasDelUser;

  async ngOnInit() 
  {
    let userLoged = this.authSrv.userLogedmail;

    if (userLoged != undefined)
    {
      let cosasFeasLeidas = await this.fotoSrv.leerDBCosasFeas()
      
        this.cosasFeasDelUser = cosasFeasLeidas.filter( (a) => 
        { 
          if (a.emisor == userLoged)
          {
            return true;
          }
          else
          {
            return false;
          }
        }
      );

      let cosasLindasLeidas = await this.fotoSrv.leerDBCosasLindas();
      this.cosasLindasDelUser = cosasLindasLeidas.filter( (a) => 
      {
        if (a.emisor == userLoged)
        {
          return true;
        }
        else
        {
          return false;
        }
      });

      console.log(this.cosasFeasDelUser);
      console.log(this.cosasLindasDelUser);
    }
  }

  volver()
  {
    this.routerRecieved.navigate(['/loged']); 
  }

}
