import { Component, OnInit } from '@angular/core';

import { getAuth, signOut } from "firebase/auth";
import { HomePage } from '../home/home.page';
import { ActivatedRoute, Router } from '@angular/router';


import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
})
export class LogedComponent implements OnInit {

  constructor(private routerRecieved:Router, 
    private flashlight: Flashlight,
    private vibration: Vibration,
    private screenOrientation: ScreenOrientation,
    private deviceMotion: DeviceMotion){}

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

  apretado: boolean = false;

  activado:boolean = false;

  clave:string;

  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  subscription: any;


  audioIzquierda = "../../../assets/sonidos/audioIzquierda.mp3";
  audioDerecha = "../../../assets/sonidos/audioDerecha.mp3";
  audioVertical = "../../../assets/sonidos/audioVertical.mp3";
  audioHorizontal = "../../../assets/sonidos/audioHorizontal.mp3";
  audio = new Audio();

  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';

  comenzar()
  {
      let imgLocked = document.getElementById("lock-closed");
      let imgUnlocked = document.getElementById("lock-open");
      let unlockSection = document.getElementById("card-desactivar");

      unlockSection.removeAttribute("hidden");
      imgLocked.removeAttribute("hidden");

      imgUnlocked.setAttribute("hidden","true");

      this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if(acceleration.x > 5)
      {
        //Inclinacion Izquierda
        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      }
      else if (acceleration.x < -5) 
      {
        //Inclinacion Derecha
        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();        
      }
      else if (acceleration.y >= 9) 
      {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular='arriba';
        
        if ((this.posicionActualCelular!=this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }

        this.audio.play();
        this.movimientoVertical();
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular='plano';
        this.movimientoHorizontal();
      }

    });
  }


  movimientoIzquierda(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha(){
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if(this.posicionActualCelular!= this.posicionAnteriorCelular){
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical(){
    if(this.primerIngresoFlash){
      this.primerIngresoFlash ? this.flashlight.switchOn() : false;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal(){
    if(this.posicionActualCelular!=this.posicionAnteriorCelular){
      this.posicionAnteriorCelular='plano';
      this.audio.src = this.audioHorizontal;
    }

    this.primerIngreso ? null : this.audio.play();
    this.primerIngreso ? null : this.vibration.vibrate(5000);
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }

  desactivar()
  {
    console.log(this.clave);

    if (this.clave == "123")
    {
      let imgLocked = document.getElementById("lock-closed");
      let imgUnlocked = document.getElementById("lock-open");
      let unlockSection = document.getElementById("card-desactivar");
  
      imgUnlocked.removeAttribute("hidden");
  
      unlockSection.setAttribute("hidden","true");
      imgLocked.setAttribute("hidden","true");


      this.activado = false;
      this.subscription.unsubscribe();
      this.audio.pause();
    }
    else
    {
      this.flashlight.switchOn();
      this.vibration.vibrate(5000);
      this.audio.src = this.audioHorizontal;
      this.audio.play();

      setTimeout(() => 
      {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
    }

    this.clave = "";
  }

}
