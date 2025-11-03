import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AlertaService } from '../service/alerta.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario:string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alerta: AlertaService

  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }
  confirmSenha(event:any){
    this.confirmarSenha=event.target.value
  }
  tipoUser(event:any){
    this.tipoUsuario=event.target.value
  }
  cadastrar(){
    if(this.user.nome.length<3){
      this.alerta.showAlertDanger('Preencha o campo nome com pelo menos 3 caracteres')
    }
    this.user.tipo = this.tipoUsuario
    if(this.user.senha.length<6){
      this.alerta.showAlertDanger('Preencha o campo senha com pelo menos 6 caracteres')
    }else if(this.user.senha != this.confirmarSenha){
      this.alerta.showAlertDanger('As senhas estão incorretas')
    }else{
      this.authService.cadastrar(this.user).subscribe((resp:User)=>{
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alerta.showAlertSuccess('Usuario cadastrado com sucesso!!!')
      })
    }
  }

}
