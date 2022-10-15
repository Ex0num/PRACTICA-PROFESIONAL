import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import {Howl, Howler} from 'howler';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@awesome-cordova-plugins/device-orientation/ngx'

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
})
export class LogedComponent implements OnInit {

  lenguajeActual = "español";
  temaActual = "animales";

  deviceOrientation:any;

  constructor(private routerRecieved:Router, deviceOrientationRecieved:DeviceOrientation) {
    this.deviceOrientation = deviceOrientationRecieved;
  }

  ngOnInit() 
  {
    const auth = getAuth();
    
    try
    {
      if (auth.currentUser.email != null)
      {
        
      }
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

  async itemClickeado(nroItemRecibido:number)
  {  
    this.reproducirSonido(nroItemRecibido);  
  }

  actualizarLenguaje(lenguaje:string)
  {
    let languageShowed = document.getElementById("language-showed");
    
    switch (lenguaje) 
    {
      case 'español':
      {
        languageShowed.innerHTML = '🇪🇸';
        break;
      }
      case 'portugues':
      {
        languageShowed.innerHTML = '🇵🇹';
        break;
      }
      case 'ingles':
      {
        languageShowed.innerHTML = '🇬🇧';
        break;
      }
    }

    this.lenguajeActual = lenguaje;
    console.log(this.lenguajeActual);
  }

  actualizarTema(tema:string)
  {
    let themeShowed = document.getElementById("theme-showed");

    switch (tema) 
    {
      case 'animales':
      {
        themeShowed.innerHTML = '🦁';
        break;
      }
      case 'colores':
      {
        themeShowed.innerHTML = '🔴';
        break;
      }
      case 'numeros':
      {
        themeShowed.innerHTML = '🔢';
        break;
      }
    }

    this.temaActual = tema;
    console.log(this.temaActual);
    this.actualizarBackground(this.temaActual)
  }

  reproducirSonido(itemClickeado:number)
  {
      let lenguajeActual = this.lenguajeActual;
      let temaActual = this.temaActual;

      switch (lenguajeActual) 
      {
        case "español":
        {
            switch (temaActual) 
            {
              case "colores":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/rojo.mp3', 'rojo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/azul.mp3', 'azul.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/verde.mp3', 'verde.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/amarillo.mp3', 'amarillo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/rosa.mp3', 'rosa.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/esp/violeta.mp3', 'violeta.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              } 
              case "animales":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/leon.mp3', 'leon.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/perro.mp3', 'perro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/gato.mp3', 'gato.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/elefante.mp3', 'elefante.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/hormiga.mp3', 'hormiga.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/esp/pajaro.mp3', 'pajaro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
              case "numeros":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/uno.mp3', 'uno.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/dos.mp3', 'dos.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/tres.mp3', 'tres.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/cuatro.mp3', 'cuatro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/cinco.mp3', 'cinco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/esp/seis.mp3', 'seis.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
            }

          break;
        }
        case "ingles":
        {
          switch (temaActual) 
            {
              case "colores":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/rojo.mp3', 'rojo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/azul.mp3', 'azul.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/verde.mp3', 'verde.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/amarillo.mp3', 'amarillo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/rosa.mp3', 'rosa.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/ing/violeta.mp3', 'violeta.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              } 
              case "animales":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/leon.mp3', 'leon.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/perro.mp3', 'perro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/gato.mp3', 'gato.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/elefante.mp3', 'elefante.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/hormiga.mp3', 'hormiga.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/ing/pajaro.mp3', 'pajaro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
              case "numeros":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/uno.mp3', 'uno.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/dos.mp3', 'dos.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/tres.mp3', 'tres.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/cuatro.mp3', 'cuatro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/cinco.mp3', 'cinco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/ing/seis.mp3', 'seis.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
          }

          break;
        }
        case "portugues":
        {

          switch (temaActual) 
            {
              case "colores":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/rojo.mp3', 'rojo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/azul.mp3', 'azul.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/verde.mp3', 'verde.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/amarillo.mp3', 'amarillo.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/rosa.mp3', 'rosa.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/colores/por/violeta.mp3', 'violeta.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              } 
              case "animales":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/leon.mp3', 'leon.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/perro.mp3', 'perro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/gato.mp3', 'gato.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/elefante.mp3', 'elefante.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/hormiga.mp3', 'hormiga.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/animales/por/pajaro.mp3', 'pajaro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
              case "numeros":
              {
                switch (itemClickeado)
                {
                  case 1:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/uno.mp3', 'uno.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 2:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/dos.mp3', 'dos.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 3:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/tres.mp3', 'tres.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 4:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/cuatro.mp3', 'cuatro.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 5:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/cinco.mp3', 'cinco.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                  case 6:
                  {
                    // Setup the new Howl.
                    const sound = new Howl({src: ['../../assets/sonidos-v2/numeros/por/seis.mp3', 'seis.mp3']});
                    // Play the sound.
                    sound.play();
                    break;
                  }
                }

                break;
              }
          }

          break;
        }
      }
  }

  actualizarBackground(temaRecibido:string)
  {
    let item1 = document.getElementById("item1");
    let item2 = document.getElementById("item2");
    let item3 = document.getElementById("item3");
    let item4 = document.getElementById("item4");
    let item5 = document.getElementById("item5");
    let item6 = document.getElementById("item6");

    let item1_2 = document.getElementById("item1-2");
    let item2_2 = document.getElementById("item2-2");
    let item3_2 = document.getElementById("item3-2");
    let item4_2 = document.getElementById("item4-2");
    let item5_2 = document.getElementById("item5-2");
    let item6_2 = document.getElementById("item6-2"); 

    switch (temaRecibido)
    {
      case "animales":
      {
      
        item1.setAttribute("src","../../assets/buttons/animales/leon.jpg");
        item2.setAttribute("src","../../assets/buttons/animales/perro.PNG");
        item3.setAttribute("src","../../assets/buttons/animales/gato.jpg");
        item4.setAttribute("src","./../assets/buttons/animales/elefante.PNG");
        item5.setAttribute("src","../../assets/buttons/animales/hormiga.jpg");
        item6.setAttribute("src","../../assets/buttons/animales/pajaro.jpg");

        item1_2.setAttribute("src","../../assets/buttons/animales/leon.jpg");
        item2_2.setAttribute("src","../../assets/buttons/animales/perro.PNG");
        item3_2.setAttribute("src","../../assets/buttons/animales/gato.jpg");
        item4_2.setAttribute("src","./../assets/buttons/animales/elefante.PNG");
        item5_2.setAttribute("src","../../assets/buttons/animales/hormiga.jpg");
        item6_2.setAttribute("src","../../assets/buttons/animales/pajaro.jpg");

        break;
      }
      case "colores":
      {

        item1.setAttribute("src","../assets/buttons/colores/rojo.png");
        item2.setAttribute("src","../../assets/buttons/colores/azul.png");
        item3.setAttribute("src","../../assets/buttons/colores/verde.png");
        item4.setAttribute("src","../../assets/buttons/colores/amarillo.png");
        item5.setAttribute("src","../../assets/buttons/colores/rosa.png");
        item6.setAttribute("src","../../assets/buttons/colores/violeta.png");

        item1_2.setAttribute("src","../assets/buttons/colores/rojo.png");
        item2_2.setAttribute("src","../../assets/buttons/colores/azul.png");
        item3_2.setAttribute("src","../../assets/buttons/colores/verde.png");
        item4_2.setAttribute("src","../../assets/buttons/colores/amarillo.png");
        item5_2.setAttribute("src","../../assets/buttons/colores/rosa.png");
        item6_2.setAttribute("src","../../assets/buttons/colores/violeta.png");

        break;
      }
      case "numeros":
      {
        
        item1.setAttribute("src","../../assets/buttons/numeros/uno.png");
        item2.setAttribute("src","../../assets/buttons/numeros/dos.png");
        item3.setAttribute("src","../../assets/buttons/numeros/tres.png");
        item4.setAttribute("src","../../assets/buttons/numeros/cuatro.png");
        item5.setAttribute("src","../../assets/buttons/numeros/cinco.png");
        item6.setAttribute("src","../../assets/buttons/numeros/seis.png");

        item1_2.setAttribute("src","../../assets/buttons/numeros/uno.png");
        item2_2.setAttribute("src","../../assets/buttons/numeros/dos.png");
        item3_2.setAttribute("src","../../assets/buttons/numeros/tres.png");
        item4_2.setAttribute("src","../../assets/buttons/numeros/cuatro.png");
        item5_2.setAttribute("src","../../assets/buttons/numeros/cinco.png");
        item6_2.setAttribute("src","../../assets/buttons/numeros/seis.png");

        break;
      }
    }
  }

}


