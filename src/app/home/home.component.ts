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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged = this.authService.getUserLogged();

  noticias:Array<any> = [];

  constructor(private authService: AuthService, private database: DataBaseService, private router: Router) { }

  ngOnInit(): void {
    this.leer();
  }

  async leer(){
    const querySnapshot = await getDocs(collection(db, "Noticias"));

    for(var i = 0; i<querySnapshot.docs.length ;i++){
      this.noticias.push({
        Id: querySnapshot.docs[i].id,
        Autor: querySnapshot.docs[i].get("Autor"),
        Titulo: querySnapshot.docs[i].get("Titulo"),
        Descripcion: querySnapshot.docs[i].get("Descripcion"),
        Categoria: querySnapshot.docs[i].get("Categoria"),
        Fecha: querySnapshot.docs[i].get("Fecha")
        });
    }
  }

}
