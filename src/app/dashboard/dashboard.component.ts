import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data, RouterOutlet } from '@angular/router';
import { AutenticarUsuarioComponent } from '../autenticar-usuario/autenticar-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule, //Biblioteca de formulários do angular
    ReactiveFormsModule, //biblioteca de formulários reativos do angular
    CommonModule, //biblioteca de funções básicas do angular
    HttpClientModule,
    AutenticarUsuarioComponent
   ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class dashboardComponent implements OnInit{

  endpoint : string = 'http://localhost:5078/api/projeto/';

  //variável para armazenar os dados obtidos pela API
  projetos: any[] = []; //array de objetos

  mensagemCadastro: string = ''; 

  checkboxValue = false;

  formConcluir = new FormGroup({
    status : new FormControl('')
  })

  formConsultaNome = new FormGroup({
    nome : new FormControl('', [Validators.required])
  })

  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    categoria : new FormControl('', [Validators.required]),
    dataInicio : new FormControl('', [Validators.required]),
    dataEntrega : new FormControl('')
  });

  formEdicao = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    descricao: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    categoria : new FormControl('', [Validators.required]),
    dataInicio : new FormControl(''),
    dataEntrega : new FormControl(''),
  });

  formStatus = new FormGroup({
    status: new FormControl('')
  })


  //função auxiliar para que possamos exibir as
  //mensagens de erro de validação
  get fConsultaNome(){
    return this.formConsultaNome.controls;
  }

  get fCadastro() {
    return this.formCadastro.controls;
  }

  get fEdicao() {
    return this.formEdicao.controls;
  }

  //método construtor
  constructor(
    private httpClient : HttpClient
  ) {}

  //função para buscar todos os projetos
  ngOnInit(): void {

    const usuario = JSON.parse(localStorage.getItem('usuario') as string);

    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer' + usuario.AccessToken
    });

    this.httpClient.get(this.endpoint + "dashboard", {headers: httpHeaders})
    .subscribe({
      next: (data) => {
        this.projetos = (data as any[]).sort((a, b) => a.categoria - b.categoria).sort((c, d) => c.status - d.status); 
      },
      error: (e) => {
        console.log(e.error);
      }
    });
  
  }

  //recursividade do ngOnInit()
  dashboard() : void {

    this.ngOnInit();
    
  }

  //função para buscar um projeto pelo nome
  getByName() : void { 

    const nomeProjeto = this.formConsultaNome.value.nome

      this.httpClient
      .get(this.endpoint + nomeProjeto)
      .subscribe({
        next: (data) => {
          this.projetos = (data as any[]);
        },
        error: (e) => {
          console.log(e.error);
        }
      });
  }

  //função para executar o cadastro do projeto
  cadastrarProjeto() : void {

    //requisição POST para a API cadastrar a tarefa
    this.httpClient.post(this.endpoint + "criar", this.formCadastro.value)
      .subscribe({ //aguardando a resposta da API
        next: (data) => { //capturando a resposta de sucesso
          console.log(data);
          this.mensagemCadastro = 'Projeto cadastrado com sucesso.';
          this.formCadastro.reset(); //limpar o formulário
        },
        error: (e) => { //capturando a resposta de erro
          console.log(e.error);
        }
      });
  }

  //função para excluir um projeto
  excluirProjeto(id: string) : void { 

      this.httpClient.delete(this.endpoint + id)
        .subscribe({
          next: (data: any) => { 
            alert('Projeto excluído com sucesso');
            this.dashboard();
          },
          error: (e) => {
            console.log(e.error);
          }
      });

  }

  //função para exibir os dados do projeto ao clicar no botão (Editar)
  showProjeto(projeto: any): void { 
    this.formEdicao.controls['nome'].setValue(projeto.nome);
    this.formEdicao.controls['descricao'].setValue(projeto.descricao);
    this.formEdicao.controls['categoria'].setValue(projeto.categoria);
    this.formEdicao.controls['dataInicio'].setValue(projeto.dataInicio);
    this.formEdicao.controls['dataEntrega'].setValue(projeto.dataEntrega);
  }

  changeStatus(projeto: any): void {
    this.formStatus.controls['status'].setValue(projeto.status);
  }

  editarProjeto(): void { 

    this.httpClient.put(this.endpoint + "atualizar", this.formEdicao.value)
      .subscribe({
        next: (data) => {
          alert('Projeto atualizado com sucesso');
          this.dashboard();
        },
        error: (e) => {
          console.log(e.error);
        }
    });
  }

  concluirProjeto(id: string): void {

    this.httpClient.put(this.endpoint + id, this.formStatus.value)
    .subscribe({
      next: (data: any) => {
        alert('PROJETO CONCLUÍDO!')
        this.dashboard();
      },
      error: (e) => {
        console.log(e.error);
      }
    });

    };

  }