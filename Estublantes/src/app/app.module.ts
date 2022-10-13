import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogedComponent } from './loged/loged.component';
import { HomePage } from './home/home.page';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { Chat4aComponent } from './chat4a/chat4a.component';
import { Chat4bComponent } from './chat4b/chat4b.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
// import { SplashscreenComponent } from './splashscreen/splashscreen.component';

const appRoutes:Routes=[

  {path:"",component:HomePage},
  {path:"loged",component:LogedComponent},
  {path: "chat4a",component:Chat4aComponent},
  {path: "chat4b",component:Chat4bComponent},
  // {path: "splash",component:SplashscreenComponent}
];

@NgModule({
  //Aca van los modulos
  declarations: [AppComponent, LogedComponent,SplashscreenComponent,Chat4aComponent,Chat4bComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ScrollingModule, RouterModule.forRoot(appRoutes), FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
