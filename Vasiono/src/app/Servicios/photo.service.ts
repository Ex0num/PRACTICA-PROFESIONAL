import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { addDoc, collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { uploadString } from 'firebase/storage';
import { Observable } from 'rxjs';
import { Foto } from '../Entidades/foto';
import { cosasFeas, cosasLindas, db, FirestoreService, storage } from './firestore.service';



@Injectable({
  providedIn: 'root'
})
export class PhotoService 
{
  constructor(public srvFirestore:FirestoreService) 
  {}

  public seccionElegida = "cosaslindas";
  flagLoadingPublicaciones = true;
  
  cosasLindasDB: any[] = [];

  
  public async addNewToGallery() 
  {
    //Saca la foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true,
    });

    //Obtengo los datos necesarios de la entidad FOTO
    console.log(this.srvFirestore.userLogedmail);
    let emisor = this.srvFirestore.userLogedmail;
    let fecha = new Date().toLocaleDateString();
    let hora = new Date().toLocaleTimeString();
    
    //Estructuro la foto
    let fotoEstructurada = 
    {
      emisor: emisor,
      fecha: fecha,
      hora: hora,
      foto: capturedPhoto,
      likes: new Array()
    }

    this.subirFoto(capturedPhoto, fotoEstructurada);
  }

  // COSAS LINDAS

  private async subirFoto(filePhoto:any,fotoEstructuradaRecibida:any)
  {
    let lastId = this.getLastIDCosasLindas();
    let newID = await lastId + 1;

    let fechaValida = fotoEstructuradaRecibida.fecha;
    console.log(fechaValida);

    do { fechaValida = fechaValida.replace("/",":"); } while(fechaValida.includes("/"));
    
    console.log(filePhoto.name);
    let referencia = ref(storage, `images/${fotoEstructuradaRecibida.emisor + "-" + fechaValida + "-" + fotoEstructuradaRecibida.hora}`);

    uploadString(referencia, filePhoto.dataUrl,'data_url').then((snapshot)=>
    {
      getDownloadURL(referencia).then(async (url)=>
      {
          fotoEstructuradaRecibida.foto = url;
          //const docRef = await setDoc(doc(db, 'cosaslindas', newID.toString()), fotoEstructuradaRecibida);

          // const docRef = await addDoc(collection(db, "cosaslindas"),fotoEstructuradaRecibida);
          
          let newDocument = doc(db,"cosaslindas", newID.toString());
          await setDoc(newDocument,fotoEstructuradaRecibida);
      });
    }).catch( () => { console.log("Error");})   
  }

  async leerDBCosasLindas()
  {
    console.log("-------------------------------------");
    console.log("COSAS LINDAS LEIDAS DE LA DB:")

    let cosasLindasDB = new Array();

    //Obtengo los documentos de forma asincronica, con un await. Por cada documento creo un usuario le asigno los datos y lo guardo
    // let cosaslindas = collection(db, "cosaslindas");
    const querySnapshot = await getDocs(collection(db, "cosaslindas"));
    
    querySnapshot.forEach((doc) => 
    {
        // imprimo la data
        console.log(doc.id, " => ", doc.data());
        
        let data = doc.data();
        data.id = doc.id;

        // let publicacion = new Foto(doc.data()['emisor'],doc.data()['fecha'],doc.data()['foto'],doc.data()['hora'],doc.data()['like']);
        cosasLindasDB.push(data);
    });

    console.log(cosasLindasDB);

    // cosasLindasDB = cosasLindasDB.sort();
    cosasLindasDB = cosasLindasDB.sort( (a,b) => 
    {
        if (parseInt(a.id) > parseInt(b.id))
        {
          console.log(a.id);
          return -1;
        }
        else
        {
          console.log(b.id);
          return 1;
        }
    });
    
    console.log(cosasLindasDB);

    return cosasLindasDB;
  }

  private async getLastIDCosasLindas()
  {
    let querySnapshot = getDocs(cosasLindas);
    let flagMax = 0;

    (await ((querySnapshot))).docs.forEach((doc) => 
    {
      if (parseInt(doc.id) > flagMax)
      {
        flagMax = parseInt(doc.id);
        // console.log(flagMax);
      }
    });

    console.log(flagMax);
    return flagMax;
  }

  modificarImagen(foto : any)
  {
    let docRef = doc(db, `cosaslindas/${foto.id}`);
    return updateDoc(docRef, foto);
  }

  // COSAS FEAS

  public async addNewToGalleryFea() 
  {
    //Saca la foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
      webUseInput: true,
    });

    //Obtengo los datos necesarios de la entidad FOTO
    console.log(this.srvFirestore.userLogedmail);
    let emisor = this.srvFirestore.userLogedmail;
    let fecha = new Date().toLocaleDateString();
    let hora = new Date().toLocaleTimeString();
    
    //Estructuro la foto
    let fotoEstructurada = 
    {
      emisor: emisor,
      fecha: fecha,
      hora: hora,
      foto: capturedPhoto,
      likes: new Array()
    }

    this.subirFotoFea(capturedPhoto, fotoEstructurada);
  }


  private async subirFotoFea(filePhoto:any,fotoEstructuradaRecibida:any)
  {
    let lastId = this.getLastIDCosasFeas();
    let newID = await lastId + 1;

    let fechaValida = fotoEstructuradaRecibida.fecha;
    console.log(fechaValida);

    do { fechaValida = fechaValida.replace("/",":"); } while(fechaValida.includes("/"));
    
    console.log(filePhoto.name);
    let referencia = ref(storage, `images/${fotoEstructuradaRecibida.emisor + "-" + fechaValida + "-" + fotoEstructuradaRecibida.hora}`);

    uploadString(referencia, filePhoto.dataUrl,'data_url').then((snapshot)=>
    {
      getDownloadURL(referencia).then(async (url)=>
      {
          fotoEstructuradaRecibida.foto = url;
          let newDocument = doc(db,"cosasfeas", newID.toString());
          await setDoc(newDocument,fotoEstructuradaRecibida);
      });
    }).catch( () => { console.log("Error");})   
  }

  async leerDBCosasFeas()
  {
    console.log("-------------------------------------");
    console.log("COSAS FEAS LEIDAS DE LA DB:")

    let cosasFeasDB = new Array();

    const querySnapshot = await getDocs(collection(db, "cosasfeas"));
    
    querySnapshot.forEach((doc) => 
    {
        // imprimo la data
        console.log(doc.id, " => ", doc.data());
        
        let data = doc.data();
        data.id = doc.id;

        // let publicacion = new Foto(doc.data()['emisor'],doc.data()['fecha'],doc.data()['foto'],doc.data()['hora'],doc.data()['like']);
        cosasFeasDB.push(data);
    });

    console.log(cosasFeasDB);

    // cosasLindasDB = cosasLindasDB.sort();
    cosasFeasDB = cosasFeasDB.sort( (a,b) => 
    {
        if (parseInt(a.id) > parseInt(b.id))
        {
          console.log(a.id);
          return -1;
        }
        else
        {
          console.log(b.id);
          return 1;
        }
    });
    
    console.log(cosasFeasDB);

    return cosasFeasDB;
  }

  private async getLastIDCosasFeas()
  {
    let querySnapshot = getDocs(cosasFeas);
    let flagMax = 0;

    (await ((querySnapshot))).docs.forEach((doc) => 
    {
      if (parseInt(doc.id) > flagMax)
      {
        flagMax = parseInt(doc.id);
        // console.log(flagMax);
      }
    });

    console.log(flagMax);
    return flagMax;
  }

  modificarImagenFea(foto : any)
  {
    let docRef = doc(db, `cosasfeas/${foto.id}`);
    return updateDoc(docRef, foto);
  }
}
