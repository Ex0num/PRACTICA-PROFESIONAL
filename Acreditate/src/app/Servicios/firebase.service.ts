import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, Firestore, getDocs, getFirestore, setDoc } from 'firebase/firestore/lite';
import { db, usuarios } from '../home/home.page';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBOwEbZxMh6w8rgEhCMI8YPst6K4R4EZrA",
//   authDomain: "acreditate-glg.firebaseapp.com",
//   projectId: "acreditate-glg",
//   storageBucket: "acreditate-glg.appspot.com",
//   messagingSenderId: "442045055982",
//   appId: "1:442045055982:web:94c6f1d9efc6bab552c4ff"
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const usuarios = collection(db, "usuarios");

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  public async crearUsuarioDB(mailRecibido) 
  {
    
    /*ESCANEO QR DE DATOS*/
    
    //Estructuro el usuario
    let usuarioEstructurado = 
    {
      mail: mailRecibido,
      creditos: 0,
      qr10: 0,
      qr50: 0,
      qr100: 0
    }

    let lastId = this.getLastIDUsuarios();
    let newID = await lastId + 1;

    let newDocument = doc(db,"usuarios", newID.toString());
    await setDoc(newDocument,usuarioEstructurado);

  }

  public async modificarUsuarioDB(mailRecibido, creditosRecibidos, qr10Recibido, qr50Recibido, qr100Recibido)
  {
    let usuarioEncontrado = await this.buscarUserByMail(mailRecibido);

    let dataEstructuradaNueva = 
    {
      mail: mailRecibido,
      creditos: creditosRecibidos,
      qr10: qr10Recibido,
      qr50: qr50Recibido,
      qr100: qr100Recibido
    }

    console.log(usuarioEncontrado);

    let newDocumentRef = doc(db,"usuarios", usuarioEncontrado.id.toString());
    await setDoc(newDocumentRef,dataEstructuradaNueva);
  }

  public async limpiarCreditosUsuarioDB(mailRecibido)
  {
    let usuarioEncontrado = await this.buscarUserByMail(mailRecibido);

    let usuarioEstructurado =
    {
      mail: mailRecibido, 
      creditos: 0,
      qr10: 0,
      qr50: 0,
      qr100: 0
    }

    let newDocument = doc(db,"usuarios", usuarioEncontrado.id.toString());
    await setDoc(newDocument,usuarioEstructurado);
  }

  private async getLastIDUsuarios()
  {
    let querySnapshot = getDocs(usuarios);
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

  public async buscarUserByMail(mailRecibido)
  {
    let dataFound:any;
    let querySnapshot = getDocs(usuarios);

    (await ((querySnapshot))).docs.forEach((doc) => 
    {
      if (doc.data()["mail"] == mailRecibido)
      {
        dataFound = doc.data();
        dataFound.id = doc.id;
      }
    });

    return dataFound;
  }
}