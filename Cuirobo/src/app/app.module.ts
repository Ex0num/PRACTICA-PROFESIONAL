import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogedComponent } from './loged/loged.component';
import { HomePage } from './home/home.page';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import {  FormsModule  } from '@angular/forms';

const appRoutes:Routes=[

  {path:"",component:HomePage},
  {path:"loged",component:LogedComponent},
  // {path: "splash",component:SplashscreenComponent}
];

@NgModule({
  //Aca van los modulos
  declarations: [AppComponent, LogedComponent,SplashscreenComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes), FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Flashlight, Vibration, ScreenOrientation, DeviceMotion],
  bootstrap: [AppComponent],
})
export class AppModule {}
