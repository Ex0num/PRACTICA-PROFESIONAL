import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { CosaslindasComponent } from '../cosaslindas/cosaslindas.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { PhotoService } from '../Servicios/photo.service';
// import { PhotoService} from '../Servicios/photo.service';


@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
})
export class LogedComponent implements OnInit {

  constructor(private routerRecieved:Router, public srvPhoto:PhotoService) {}

  ngOnInit() 
  {
    const auth = getAuth();
    
    try
    {
      if (auth.currentUser.email != null)
      {}
    }
    catch(e)
    {
      this.routerRecieved.navigate(['/home']);
    }
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

  cosasLindasClick()
  {
    this.srvPhoto.leerDBCosasLindas();
    this.routerRecieved.navigate(['/cosaslindas']);
  }

  cosasFeasClick()
  {
    this.srvPhoto.leerDBCosasFeas();
    this.routerRecieved.navigate(['/cosasfeas']);
  }

  navigateToGraphs()
  {
    // GraphsComponent.prototype.cargarData();
    this.routerRecieved.navigate(['/graphs']);
  }

  navigateToOwnPhotos()
  {
    // GraphsComponent.prototype.cargarData();
    this.routerRecieved.navigate(['/cosaspropias']);
  }

}
