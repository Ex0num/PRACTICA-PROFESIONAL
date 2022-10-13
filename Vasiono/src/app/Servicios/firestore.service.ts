import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore/lite';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Storage } from '@capacitor/storage';
import { getStorage, ref, uploadString } from "firebase/storage"
import { app } from '../home/home.page';

export const storage = getStorage();
export const db = getFirestore(app);
export const cosasLindas = collection(db, "cosaslindas");
export const cosasFeas = collection(db, "cosasfeas");

@Injectable({
  providedIn: 'root'
})
export class FirestoreService 
{
  
  userLogedmail: any | undefined;

  constructor(private router: Router, private route: ActivatedRoute)
  {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => 
    {
      if (user) 
      {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        //Si el usuario esta logeado
        //..;
        this.userLogedmail = user.email;
        // ...
      } else 
      {
        // User is signed out
        // ...
        //Si el usuario no esta logeado
        //..
        this.userLogedmail = undefined;

        console.log("DESLOGEADO!!");
      }
    });

  }

  logOut()
  {
    const auth = getAuth();
    signOut(auth).then(() => 
    {
      // Sign-out successful.
      console.log("Cierre de sesión satisfactorio. Vuelva prontosss!");
      this.userLogedmail = undefined;
      this.router.navigate(['/home']);

    }).catch((error) => 
    {
      // An error happened.
      console.log(error);
    });
  }

}
