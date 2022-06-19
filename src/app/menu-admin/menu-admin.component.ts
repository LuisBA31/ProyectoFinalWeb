import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBzNSjDqDMolBbWBx58eFDI8UYtJLjYyaw",
  authDomain: "requiemgeekshop.firebaseapp.com",
  projectId: "requiemgeekshop",
  storageBucket: "requiemgeekshop.appspot.com",
  messagingSenderId: "246133176804",
  appId: "1:246133176804:web:bc564b8c33f60fec372ff1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  id:any = "";

  noticia:any={
    Autor: '',
    Titulo: '',
    Categoria: '',
    Descripcion: '',
    RutaImagen: '',
    Fecha: ''
  }
  updateNoticia:any={
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
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }catch(e){
      console.log("Error al dar de alta la noticia");
    }
  }

  async leer(){
    const querySnapshot = await getDocs(collection(db, "Noticias"));

    for(var i = 0; i<querySnapshot.docs.length ;i++){
      this.noticias.push({
        Id: querySnapshot.docs[i].id,
        Autor: querySnapshot.docs[i].get("Autor"),
        Titulo: querySnapshot.docs[i].get("Titulo"),
        Categoria: querySnapshot.docs[i].get("Categoria"),
        Fecha: querySnapshot.docs[i].get("Fecha")
        });
    }
  }
  eliminar(IdRegistro:any){
    this.database.eliminar("Noticias",IdRegistro);
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }
  mostrarFormulario(IdRegistro:any){
    var div:any;
    div = document.getElementById("actualizarNoticia");
    div.style.display="block";
    this.id = IdRegistro;
  }
  actualizar(){
    this.updateNoticia.RutaImagen = this.updateNoticia.Titulo + ".jpg";
    this.database.actualizar("Noticias",this.updateNoticia,this.id);
      let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }
}
