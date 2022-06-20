import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

//Chart.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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

  titulo:string ="Actualidad";

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
  updateCategoriaVec:Array<any> = [];
  Categorias:Array<any> = ['Actualidad','Ciencia','Deportes','Drama','Politica','Salud','Social'];
  datosCategoria:Array<any> = [];

  constructor(private authService: AuthService, private database: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    this.leer();
    this.graficar();
  }

  async graficar(){
    const querySnapshot = await getDocs(collection(db, "Categorias"));
    this.datosCategoria = [querySnapshot.docs[0].get("Actualidad"),querySnapshot.docs[0].get("Ciencia"),querySnapshot.docs[0].get("Deportes"),querySnapshot.docs[0].get("Drama"),querySnapshot.docs[0].get("Politica"),querySnapshot.docs[0].get("Salud"),querySnapshot.docs[0].get("Social")];
    //Generando gráfica
      const myChart = new Chart("myChart", {
        type: 'pie',
        data: {
            labels: ['Actualidad', 'Ciencia', 'Deportes', 'Drama', 'Politica', 'Salud', 'Social'],
            datasets: [{
                label: 'Valores',
                data: this.datosCategoria,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(53, 102, 25, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(13, 102, 25, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
  }

  cambio(tit : string){
    this.titulo=tit;
  }

  async altaNoticia(){
    this.noticia.RutaImagen = this.noticia.Titulo + ".jpg";
    this.noticia.Categoria = this.titulo;
    try{
      this.database.crear('Noticias',this.noticia);
      const querySnapshot = await getDocs(collection(db, "Categorias"));
      var aux = querySnapshot.docs[0].get(this.titulo);
      aux++;
      this.updateCategoriaVec.push({
        Actualidad: querySnapshot.docs[0].get("Actualidad"),
        Ciencia: querySnapshot.docs[0].get("Ciencia"),
        Deportes: querySnapshot.docs[0].get("Deportes"),
        Drama: querySnapshot.docs[0].get("Drama"),
        Politica: querySnapshot.docs[0].get("Politica"),
        Salud: querySnapshot.docs[0].get("Salud"),
        Social: querySnapshot.docs[0].get("Social")
      });
      switch (this.titulo) {
        case "Actualidad":
          this.updateCategoriaVec[0].Actualidad = aux;
          break;
        case "Ciencia":
          this.updateCategoriaVec[0].Ciencia = aux;
          break;
        case "Deportes":
          this.updateCategoriaVec[0].Deportes = aux;
          break;
        case "Drama":
          this.updateCategoriaVec[0].Drama = aux;
          break;
        case "Politica":
          this.updateCategoriaVec[0].Politica = aux;
          break;
        case "Salud":
          this.updateCategoriaVec[0].Salud = aux;
          break;
        case "Social":
          this.updateCategoriaVec[0].Social = aux;
          break;
      }
      this.database.actualizar("Categorias", this.updateCategoriaVec[0],"1");
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

  async eliminar(IdRegistro:any, Categoria:any){
    this.database.eliminar("Noticias",IdRegistro);
    const querySnapshot = await getDocs(collection(db, "Categorias"));
      var aux = querySnapshot.docs[0].get(Categoria);
      aux--;
      this.updateCategoriaVec.push({
        Actualidad: querySnapshot.docs[0].get("Actualidad"),
        Ciencia: querySnapshot.docs[0].get("Ciencia"),
        Deportes: querySnapshot.docs[0].get("Deportes"),
        Drama: querySnapshot.docs[0].get("Drama"),
        Politica: querySnapshot.docs[0].get("Politica"),
        Salud: querySnapshot.docs[0].get("Salud"),
        Social: querySnapshot.docs[0].get("Social")
      });
      switch (Categoria) {
        case "Actualidad":
          this.updateCategoriaVec[0].Actualidad = aux;
          break;
        case "Ciencia":
          this.updateCategoriaVec[0].Ciencia = aux;
          break;
        case "Deportes":
          this.updateCategoriaVec[0].Deportes = aux;
          break;
        case "Drama":
          this.updateCategoriaVec[0].Drama = aux;
          break;
        case "Politica":
          this.updateCategoriaVec[0].Politica = aux;
          break;
        case "Salud":
          this.updateCategoriaVec[0].Salud = aux;
          break;
        case "Social":
          this.updateCategoriaVec[0].Social = aux;
          break;
      }
      this.database.actualizar("Categorias", this.updateCategoriaVec[0],"1");
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
    this.updateNoticia.Categoria = this.titulo;
    this.updateNoticia.RutaImagen = this.updateNoticia.Titulo + ".jpg";
    this.database.actualizar("Noticias",this.updateNoticia,this.id);
      let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }
}
