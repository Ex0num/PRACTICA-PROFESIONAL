import { Component } from '@angular/core';
import { Usuario } from '../Entidades/usuario';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc} from 'firebase/firestore/lite';
import { ActivatedRoute, Router } from '@angular/router';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCJ2ir1LP8xfKWVwYX_qUhgNasapmletY",
  authDomain: "estublantes-glg.firebaseapp.com",
  projectId: "estublantes-glg",
  storageBucket: "estublantes-glg.appspot.com",
  messagingSenderId: "360887867380",
  appId: "1:360887867380:web:a1e634defba301d7b74ba1",
  measurementId: "G-7Q1JM3FLWQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{
  //Tengo a mis 2 variables dinamicas NGMODEL, mail ingresado y password.
  public mailIngresado:string = "";
  public passwordIngresado:string = "";

  public user = new Usuario();
  public listaUsuariosDB:[Usuario] = [this.user];

  constructor(private routerRecieved:Router) 
  {

    this.user.mail = "aux";
    this.user.password = "aux";
  }

  //---------- BOTONES TEMPORALES-------------------

  adminAutocomplete()
  {
    let txtBoxMail = document.getElementById("mail");
    let txtBoxPassword = document.getElementById("password");

    txtBoxMail.setAttribute("value","admin@admin.com");
    txtBoxPassword.setAttribute("value","111111");
  }

  userAutocomplete()
  {
    let txtBoxMail = document.getElementById("mail");
    let txtBoxPassword = document.getElementById("password");

    txtBoxMail.setAttribute("value","usuario@usuario.com");
    txtBoxPassword.setAttribute("value","333333");
  }

  testerAutocomplete()
  {
    let txtBoxMail = document.getElementById("mail");
    let txtBoxPassword = document.getElementById("password");

    txtBoxMail.setAttribute("value","tester@tester.com");
    txtBoxPassword.setAttribute("value","555555");
  }

  limpiarControles()
  {
    let txtBoxMail = document.getElementById("mail");
    let txtBoxPassword = document.getElementById("password");

    txtBoxMail.setAttribute("value","");
    txtBoxPassword.setAttribute("value","");

    let txtBoxSatisfaccion = document.getElementById("txtSatisfaccion");
    txtBoxSatisfaccion.setAttribute("hidden","true");

    let txtBoxError = document.getElementById("txtError");
    txtBoxError.setAttribute("hidden","true");

    let btnAdmin = document.getElementById("btnAdmin");
    btnAdmin.setAttribute("hidden","true");

    let btnUsuario = document.getElementById("btnUsuario");
    btnUsuario.setAttribute("hidden","true");

    let btnMal = document.getElementById("btnMal");
    btnMal.setAttribute("hidden","true");
  }
  //--------------------------------------------------

  private mostrarError(errorRecibido:string)
  {
    let txtBoxError = document.getElementById("txtError");
    txtBoxError.textContent = errorRecibido;
    txtBoxError.removeAttribute("hidden");

    let txtBoxSatisfaccion = document.getElementById("txtSatisfaccion");
    txtBoxSatisfaccion.setAttribute("hidden","true");
  }

  private mostrarSatisfaccion(satisfaccionRecibida:string)
  {
    let txtBoxSatisfaccion = document.getElementById("txtSatisfaccion");
    txtBoxSatisfaccion.textContent = satisfaccionRecibida;
    txtBoxSatisfaccion.removeAttribute("hidden");

    let txtBoxError = document.getElementById("txtError");
    txtBoxError.setAttribute("hidden","true");
  }

  async registerAuthFirebase()
  {
      const auth = getAuth();
      
      createUserWithEmailAndPassword(auth, this.mailIngresado, this.passwordIngresado).then(async (userCredential) => 
      {
          this.mostrarSatisfaccion("Su usuario acaba de ser registrado satisfactoriamente."); 
          this.limpiarControles();
           
      
          // Signed in
          const userRegistered = userCredential.user;

          this.routerRecieved.navigate(['/loged']);
        })
        .catch((error) => 
        {
          const errorCode = error.code;
          const errorMessage = error.message;

          switch (errorCode) 
          {
            case "auth/invalid-email":
            {
              this.mostrarError("El mail ingresado es inválido.");
              break;
            }
            case "auth/internal-error":
            {
              this.mostrarError("Hubo un error interno de procesamiento.");
              break;
            }
            case "auth/weak-password":
            {
              this.mostrarError("La contraseña ingresada es débil. Mínimo 6 caracteres.");
              break;
            }
            case "auth/missing-email":
            {
              this.mostrarError("No se ha detectado un mail.");
              break;
            }
            case "auth/email-already-in-use":
            {
              this.mostrarError("Ya existe una cuenta con el mail ingresado.");
              break;
            }
            case "auth/network-request-failed":
            {
              this.mostrarError("Hubo un problema de conexión. Verifica tu conexión.");
              break;
            }
            default:
            {
              this.mostrarError("Ocurrió un error inesperado. Por favor comunícate con el soporte.");
              break;
            }
          }
        });
  }

  public loginAuthFirebase()
  {
    const auth = getAuth();
    
    signInWithEmailAndPassword(auth, this.mailIngresado, this.passwordIngresado).then((userCredential) =>
     {

      this.mostrarSatisfaccion("El inicio de sesión fue satisfactorio. Bienvenido/a.");

        // Signed in
        const userLoged = userCredential.user;
        this.limpiarControles();
        this.routerRecieved.navigate(['/loged']);
      })
      .catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) 
          {
            case "auth/invalid-email":
            {
              this.mostrarError("El mail ingresado es inválido.");
              break;
            }
            case "auth/internal-error":
            {
              this.mostrarError("Hubo un error interno de procesamiento.");
              break;
            }
            case "auth/weak-password":
            {
              this.mostrarError("La contraseña ingresada es débil. Mínimo 6 caracteres.");
              break;
            }
            case "auth/missing-email":
            {
              this.mostrarError("No se ha detectado un mail.");
              break;
            }
            case "auth/email-already-in-use":
            {
              this.mostrarError("Ya existe una cuenta con el mail ingresado.");
              break;
            }
            case "auth/network-request-failed":
            {
              this.mostrarError("Hubo un problema de conexión. Verifica tu conexión.");
              break;
            }
            default:
            {
              this.mostrarError(errorMessage);
              break;
            }
          }
      });
  }
}
