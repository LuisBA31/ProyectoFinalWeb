import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public phoneClick() {
    let aux: any;
    aux = document.getElementById("formPrincipal");
    aux.style.display = "none"
    let result: any;
    result = document.getElementById("LoginPhone");
    result.style.display = "block"
  }
  public phoneClickRegresar() {
    let aux: any;
    aux = document.getElementById("formPrincipal");
    aux.style.display = "block"
    let result: any;
    result = document.getElementById("LoginPhone");
    result.style.display = "none"
  }
}
