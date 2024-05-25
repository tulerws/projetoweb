import { Component, OnInit } from '@angular/core';
import { dashboardComponent } from '../dashboard/dashboard.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    dashboardComponent
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent{

  endpoint: string = "http://localhost:5078/usuario/"

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  formCriarUsuario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/)]),
    senhaConfirmacao: new FormControl('', [Validators.required])
  });

  

  get f() { 
    return this.formLogin.controls;
  }

  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) {}

  onSubmit(): void {

    this.httpClient.post(this.endpoint + "login", this.formLogin.value)
      .subscribe({
        next: (data) => {
          localStorage.setItem('usuario', JSON.stringify(data));                //DESCOBRIR COMO IR PRA TELA DO DASHBOARD AO LOGAR
          this.router.navigate(['dashboard']);
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }

  criarUsuario(): void{ 

    if(this.formCriarUsuario.value.senha == this.formCriarUsuario.value.senhaConfirmacao) {

      this.httpClient.post(this.endpoint + "criar", this.formCriarUsuario.value)
      .subscribe({
        next: (data) => {
          console.log("sucesso")
          this.formCriarUsuario.reset();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }
    else{
       console.log("Senhas não conferem, por favor, verifique.");
    }
  }
}