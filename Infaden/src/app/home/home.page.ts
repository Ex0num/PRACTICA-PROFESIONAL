import { Component } from '@angular/core';
import { Usuario } from '../Entidades/usuario';

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc} from 'firebase/firestore/lite';
import { ActivatedRoute, Router } from '@angular/router';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANLECTzGkEXW17Bu1R25gmz-mV0d48WQI",
  authDomain: "infaden-glg.firebaseapp.com",
  databaseURL: "https://infaden-glg-default-rtdb.firebaseio.com",
  projectId: "infaden-glg",
  storageBucket: "infaden-glg.appspot.com",
  messagingSenderId: "891056861955",
  appId: "1:891056861955:web:02baff4106dd0635f12f36",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  user = new Usuario();
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
          // this.limpiarControles();
           
      
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
              this.mostrarError("El mail ingresado es inv??lido.");
              break;
            }
            case "auth/internal-error":
            {
              this.mostrarError("Hubo un error interno de procesamiento.");
              break;
            }
            case "auth/weak-password":
            {
              this.mostrarError("La contrase??a ingresada es d??bil. M??nimo 6 caracteres.");
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
              this.mostrarError("Hubo un problema de conexi??n. Verifica tu conexi??n.");
              break;
            }
            default:
            {
              this.mostrarError("Ocurri?? un error inesperado. Por favor comun??cate con el soporte.");
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

      this.mostrarSatisfaccion("El inicio de sesi??n fue satisfactorio. Bienvenido/a.");

        // Signed in
        const userLoged = userCredential.user;
        // this.limpiarControles();
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
            this.mostrarError("El mail ingresado es invalido.");
            break;
          }
          case "auth/internal-error":
          {
            this.mostrarError("Hubo un error interno de procesamiento.");
            break;
          }
          case "auth/weak-password":
          {
            this.mostrarError("La contrase??a ingresada es debil. Minimo 6 caracteres.");
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
            this.mostrarError("Hubo un problema de conexi??n. Chequea tu red.");
            break;
          }
          default:
          {
            // this.mostrarError("Ocurri?? un error inesperado. Por favor comunicate con el soporte.");
            this.mostrarError(errorMessage);
            break;
          }
        }
      });
  }
}
