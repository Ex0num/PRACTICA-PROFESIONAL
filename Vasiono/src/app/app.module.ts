import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogedComponent } from './loged/loged.component';
import { HomePage } from './home/home.page';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { CosaslindasComponent } from './cosaslindas/cosaslindas.component';
import { CosasfeasComponent } from './cosasfeas/cosasfeas.component';
import { GraphsComponent } from './graphs/graphs.component';
// import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { NgChartsModule } from 'ng2-charts';
import { CosaspropiasComponent } from './cosaspropias/cosaspropias.component';

const appRoutes:Routes=[

  {path:"",component:HomePage},
  {path:"loged",component:LogedComponent},
  {path: "cosaslindas",component:CosaslindasComponent},
  {path: "cosasfeas",component:CosasfeasComponent},
  {path: "graphs",component:GraphsComponent},
  {path: "cosaspropias",component:CosaspropiasComponent},
  // {path: "splash",component:SplashscreenComponent}
];

@NgModule({
  //Aca van los modulos
  declarations: [AppComponent, LogedComponent,SplashscreenComponent,CosaslindasComponent,CosasfeasComponent,GraphsComponent,CosaspropiasComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgChartsModule,RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload'}),], 
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
