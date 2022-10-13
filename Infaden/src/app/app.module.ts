import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy, IonImg } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogedComponent } from './loged/loged.component';
import { HomePage } from './home/home.page';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { FormsModule } from '@angular/forms';
// import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { DeviceOrientation} from '@awesome-cordova-plugins/device-orientation/ngx';

const appRoutes:Routes=[

  {path:"",component:HomePage},
  {path:"loged",component:LogedComponent},
];

@NgModule({
  //Aca van los modulos
  declarations: [AppComponent, LogedComponent,SplashscreenComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, DeviceOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}
