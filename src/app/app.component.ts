import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { AutenticarUsuarioComponent } from './autenticar-usuario/autenticar-usuario.component';
import { dashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AutenticarUsuarioComponent,
    dashboardComponent
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{

 

}



  
  

