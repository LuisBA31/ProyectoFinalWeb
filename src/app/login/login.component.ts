import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:any = {
    email: '',
    password: '',
  }

  usuarios:any = {
    CategoriaFav: '',
    NombreUsuario: '',
    Privilegio: '',
    email: '',
    password: ''
  }

  usuariosFirebase:any = {
    CategoriaFav: '',
    NombreUsuario: '',
    Privilegio: 0,
    email: '',
    password: ''
  }

  titulo:string ="Actualidad";

  constructor(private authService: AuthService, private database: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    this.database.obtenerTodos("Usuarios").subscribe((usuariosRef) => {
      console.log("usuariosRef: ", usuariosRef);
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;
        return usuario;
      });
      console.log(this.usuarios);
    })
  }

  cambio(tit : string){
    this.titulo=tit;
  }

  registrarse() {
    this.usuarios.CategoriaFav = this.titulo;
    this.usuariosFirebase.CategoriaFav = this.titulo;
    const { email, password } = this.usuarios;
    this.authService.register(email, password).then(user => {
      console.log("se registro: ", user);
      let lista = [...this.usuarios];
      let existe = lista.find(user => user.email == email);
      //let existe = lista.find(user => this.usuarios.email == email);

      if (!existe) {
        console.log("USUARIO NUEVO CREADO")
        this.database.crear('Usuarios', this.usuariosFirebase);
      };

      this.router.navigate(['/']);
    }).catch(err => {
      console.log(err)
    })
  }

  ingresar() {
    const { email, password } = this.usuario;
    this.authService.login(email, password).then(user => {
      console.log("Bienvenido ", user);
      console.log(user?.user?.email);
      if(!user) {
        alert("Datos incorrectos, si no tenes cuenta registrate!");
        return;
      };
      this.router.navigate(['/panelDeControl'])
    }).catch(err=>{
      console.log(err)
    })
  }


  logout() {
    this.authService.logout();
  }

}