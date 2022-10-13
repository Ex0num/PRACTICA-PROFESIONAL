import { Component, OnInit } from '@angular/core';

import { getAuth, signOut } from "firebase/auth";
import { HomePage } from '../home/home.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.scss'],
})
export class LogedComponent implements OnInit {

  constructor(private routerRecieved:Router) { }

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

  goToChat4a()
  {
    this.routerRecieved.navigate(['/chat4a']);
  }

  goToChat4b()
  {
    this.routerRecieved.navigate(['/chat4b']);
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

}
