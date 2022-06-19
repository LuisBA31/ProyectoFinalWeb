import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  noticia:any={
    Autor: '',
    Titulo: '',
    Categoria: '',
    Descripcion: '',
    RutaImagen: '',
    Fecha: ''
  }

  noticias:Array<any> = [];

  constructor(private authService: AuthService, private database: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    this.leer();
  }

  altaNoticia(){
    this.noticia.RutaImagen = this.noticia.Titulo + ".jpg";
    try{
      this.database.crear('Noticias',this.noticia);
    }catch(e){
      
    }
  }

  async leer(){
    const querySnapshot = await this.database.obtenerTodos('Noticias');
    /*querySnapshot.forEach((doc) => {
      this.noticias.push({
        Autor: ${doc.get("Autor")},
        Titulo: ${doc.get("Titulo")},
        Categoria: ${doc.get("Categoria")},
        Fecha: ${doc.get("Fecha")}
      });
    });*/
  }

}
