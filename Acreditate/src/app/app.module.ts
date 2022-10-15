import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { LogedComponent } from './loged/loged.component';
import { FormsModule } from '@angular/forms';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';

const appRoutes:Routes=[

  {path:"",component:HomePage},
  {path:"loged",component:LogedComponent},
  // {path: "splash",component:SplashscreenComponent}
];

@NgModule({
  declarations: [AppComponent, LogedComponent,SplashscreenComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  RouterModule.forRoot(appRoutes), FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
