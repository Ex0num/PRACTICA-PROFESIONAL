import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../Servicios/firestore.service';
import { PhotoService } from '../Servicios/photo.service';

@Component({
  selector: 'app-cosasfeas',
  templateUrl: './cosasfeas.component.html',
  styleUrls: ['./cosasfeas.component.scss'],
})
export class CosasfeasComponent implements OnInit
{
  constructor(private routerRecieved:Router, public photoSrv:PhotoService, public authSrv:FirestoreService ) {}

  publicacionesCosasFeas:any;

  spinnerMostrandose = true;

  async ngOnInit() 
  {
    //--------SPINNER----------------------------------------------
    setTimeout( ()=> { this.spinnerMostrandose = false}, 2000);
    //-

    this.publicacionesCosasFeas = await this.photoSrv.leerDBCosasFeas();

    console.log(this.publicacionesCosasFeas);
  }
  
  flagLoadingPublicaciones = true;

  async subirFoto()
  {
    await this.photoSrv.addNewToGalleryFea();  
    // this.refrescarFotos();
  }

  volver()
  {
    this.routerRecieved.navigate(['/loged']);   
  }

  // agregarVisualizacionFoto(fotoEntity:Foto)
  // {
  //   let ion_item = document.createElement("ion-item");
  //   ion_item.className = "itemloaded";
  //   ion_item.setAttribute("color","medium");

  //   let info_container = document.createElement("p");
  //   info_container.className = "info-container";

  //   ion_item.appendChild(info_container);

  //   let label_mail = document.createElement("label");
  //   label_mail.className = "mailloaded";
  //   label_mail.innerHTML = fotoEntity.emisor;

  //   info_container.appendChild(label_mail);

  //   let img = document.createElement("img");
  //   img.className = "imgloaded";
  //   img.setAttribute("src",fotoEntity.foto);

  //   info_container.appendChild(img);

  //   let ion_row = document.createElement("ion-row");

  //   info_container.appendChild(ion_row);

  //   let ion_button = document.createElement("ion-button");
  //   ion_button.className = "buttonloaded";
  //   ion_button.setAttribute("color","light");
  //   ion_button.innerHTML = "VOTAR";

  //   ion_row.appendChild(ion_button);

  //   document.getElementById("item-list").appendChild(ion_item);
  // }

  // refrescarFotos()
  // {
  //   console.log("refreshing");
  //   let arrayOfItems = document.querySelectorAll("ion-item");
  //   arrayOfItems.forEach( (element)=> { element.remove()})

  //   this.publicacionesCosasLindas.forEach(element => 
  //   {
  //     let nuevaFoto = new Foto(element.emisor,element.fecha,element.foto,element.hora,element.like);
  //     this.agregarVisualizacionFoto(nuevaFoto);
  //   });
  // }

  votarImagen(foto : any, dislike : any)
  {
 
    if(!dislike)
    {
      foto.likes.push(this.authSrv.userLogedmail);
    }
    else
    {
      foto.likes = foto.likes.filter((like : string)=>like != this.authSrv.userLogedmail);
    }

    console.log(foto);
    console.log(foto.id);
    this.photoSrv.modificarImagenFea(foto);

  }

}
