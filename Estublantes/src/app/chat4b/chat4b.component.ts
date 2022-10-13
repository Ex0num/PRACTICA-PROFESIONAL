import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { Mensaje } from '../Entidades/mensaje';
import { app } from '../home/home.page';

@Component({
  selector: 'app-chat4b',
  templateUrl: './chat4b.component.html',
  styleUrls: ['./chat4b.component.scss'],
})
export class Chat4bComponent implements OnInit {
  constructor(private routerRecieved:Router) { 

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => 
    {
      if (user) 
      {
        this.usuario = user.email;
        console.log("Loged");
        console.log(user.email);
      } 
      else 
      {}
    });
    this.recieveChanges();
  }

  ngOnInit() {}

  db = getFirestore(app);

  mensaje:string = "";

  errorLoginMessage = "";
  usuario:any = "anon";
  usuarioID:any = "00";
  flagOwnMessage = false;
  flagLoadingMessages = true;

  volver()
  {
    this.routerRecieved.navigate(['/loged']);
  }

  private async getLastID()
  {
    let mensajesRef = collection(this.db, "Mensajes2");
    let querySnapshot = getDocs(mensajesRef);
    let flagMax = 0;

    (await ((querySnapshot))).docs.forEach((doc) => 
    {
      if (parseInt(doc.id) > flagMax)
      {
        flagMax = parseInt(doc.id);
        // console.log(flagMax);
      }
    });

    return flagMax;
  }

  public async sendMessage()
  {

      if (this.mensaje.length <= 21)
      {
        //--------------- Guardo al log en la DB ---------------------
        let mensajeEnviado = new Mensaje(this.usuario, this.mensaje);
        //----------------------------------------------------------------

        this.flagOwnMessage = true;

        let lastId = this.getLastID();
        let newID = await lastId + 1;
        // console.log(newID);


        // Add a new document in collection "cities"
        await setDoc(doc(this.db, "Mensajes2", newID.toString()), 
        {
          usuario: mensajeEnviado.username,
          texto: mensajeEnviado.texto,
          hora: mensajeEnviado.horaActual,
          fecha: mensajeEnviado.fechaActual,
        });

        this.mensaje = "";
      }
      else
      {
        let lblError = document.getElementById("lbl-error2");
        lblError.removeAttribute("hidden");
  
        setTimeout( ()=>{
          lblError.setAttribute("hidden","true");
        }, 1500);
      }
  }

  public recieveChanges()
  {
      let newLastID = 0;

      const unsubscribe = onSnapshot(collection(this.db, "Mensajes2"), async () => 
      {
          // Respond to data
          if (this.flagLoadingMessages == false)
          {
            console.log("CHANGES DETECTED");

            if (this.flagOwnMessage == true)
            {
              console.log("CREANDO BUBBLE PROPIA");

              let nuevoMensaje = new Mensaje(this.usuario,this.mensaje);
              this.createOwnNewBubble(nuevoMensaje.texto,"Tú",nuevoMensaje.horaActual);
            }
            else
            {
              console.log("CREANDO BUBBLE AJENA");

              let usuarioDetectado = "";
              let textoDetectado = "";

              let mensajesRef = collection(this.db, "Mensajes2");
              
              let  lastID = this.getLastID();
              newLastID = await lastID;

              // let q = query(collection(this.db, "Mensajes"), orderBy("fechaActual", "desc"), limit(3));
              // const querySnapshot = await getDocs(q);

              let querySnapshot = getDocs(mensajesRef);

              (await querySnapshot).docs.forEach((doc) => 
              {
                if (parseInt(doc.id) == newLastID)
                {
                  let data = doc.data();
                  let mensajeNuevo = new Mensaje(data['usuario'],data['texto']);
                  this.createNewBubble(mensajeNuevo.texto, mensajeNuevo.username, mensajeNuevo.horaActual);
                }
              });
            }
          }
          else
          {
            console.log("LOADING MESSAGES");
            this.flagLoadingMessages = false;
          }

          //Reestableces flag
          this.flagOwnMessage = false;

          if (newLastID >= 100)
          {
            this.limpiarMensajes();
          }
          
      });
  }

  private async limpiarMensajes() 
  {
    let mensajesRef = collection(this.db, "Mensajes2");
    let querySnapshot = getDocs(mensajesRef);
    let flagMax = 0;

    (await ((querySnapshot))).docs.forEach((document) => 
    {
        deleteDoc(doc(this.db, "Mensajes2", document.id));
    });

    return flagMax;
  }

  public createNewBubble(mensajeRecieved:string, usernameRecieved:string, horaActual:string)
  {
    let listaMensajes = document.getElementById("chat-mensajes2");

    //Creo el mensaje como tal
    let nuevoMensaje = document.createElement("li");

    let nuevaInfo = document.createElement("p");

    //Creo el nombre y la fecha y la asigno en un label
    //let horaActualCalculada = new Date();
    //let horaString = horaActualCalculada.toLocaleTimeString();
    nuevaInfo.innerHTML = usernameRecieved  + " - " + horaActual;

    //Creo el texto y le asigno el valor recibido
    let nuevoTexto = document.createElement("p");

    let mensajeTruncado = this.textoTruncado(mensajeRecieved);

    nuevoTexto.innerHTML = mensajeTruncado;

    nuevoMensaje.appendChild(nuevaInfo);
    nuevoMensaje.appendChild(nuevoTexto);
    nuevoMensaje.setAttribute("class","othersMessage");
    nuevoMensaje.className = 'othersMessage';

    nuevoMensaje.className = "othersMessage";
    nuevoMensaje.style.backgroundColor = "#979fd6";
    nuevoMensaje.style.borderRadius = "18px";
    nuevoMensaje.style.padding = "0.8rem";
    nuevoMensaje.style.borderBottomRightRadius = "0px";
    nuevoMensaje.style.marginTop = "1rem";
    nuevoMensaje.style.fontFamily = "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
    nuevoMensaje.style.fontSize = "19px";
    nuevoMensaje.style.marginLeft = "3rem";

    console.log(nuevoMensaje);
    listaMensajes?.appendChild(nuevoMensaje);
  }

  public createOwnNewBubble(mensajeRecieved:string, usernameRecieved:string, horaActual:string)
  {
    let listaMensajes = document.getElementById("chat-mensajes2");

    //Creo el mensaje como tal
    let nuevoMensaje = document.createElement("li");

    let nuevaInfo = document.createElement("p");
    nuevaInfo.innerHTML = usernameRecieved  + " - " + horaActual;

    //Creo el texto y le asigno el valor recibido
    let nuevoTexto = document.createElement("p");
    let mensajeTruncado = this.textoTruncado(mensajeRecieved);
    nuevoTexto.innerHTML = mensajeTruncado;

    nuevoMensaje.appendChild(nuevaInfo);
    nuevoMensaje.appendChild(nuevoTexto);
    nuevoMensaje.setAttribute("class","ownMessage");
    nuevoMensaje.className = 'ownMessage';

    nuevoMensaje.className = "ownMessage";
    nuevoMensaje.style.backgroundColor = "white";
    nuevoMensaje.style.borderRadius = "18px";
    nuevoMensaje.style.borderTopLeftRadius = "0px";
    nuevoMensaje.style.padding = "0.8rem";
    nuevoMensaje.style.marginTop = "1rem";
    nuevoMensaje.style.fontFamily = "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif";
    nuevoMensaje.style.fontSize = "18px";
    nuevoMensaje.style.marginRight = "3rem";

    console.log(nuevoMensaje);
    listaMensajes?.appendChild(nuevoMensaje);
  }

  private textoTruncado(texto:string):string
  {
    let stringTruncado = texto;

    if (texto.length > 21)
    {
      let texto1Sliced = texto.slice(undefined,21);
      console.log("SLICED 1:");
      console.log(texto1Sliced);

      let texto2Sliced = texto.slice(21);
      console.log("SLICED 2:");
      console.log(texto2Sliced);

      stringTruncado = texto1Sliced + "<br>" + texto2Sliced;
    }

    console.log("STRING TRUNCADO:");
    console.log(stringTruncado);
    return stringTruncado;
  }

}
