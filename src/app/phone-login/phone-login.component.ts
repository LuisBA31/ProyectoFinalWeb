import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window.service';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export class PhoneNumber {
  country!: string;
  area!: string;
  prefix!: string;
  line!: string;

  // format phone numbers as E.164
  get e164() {
    return "+52" + this.area + this.prefix + this.line
    
  }

}

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode!: string;

  user: any;

  constructor(private win: WindowService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.RecaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.RecaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.RecaptchaVerifier;
    
    console.log(appVerifier)

    let num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num,appVerifier)
            .then((result: any) => {

                this.windowRef.confirmationResult = result;

            })
            .catch( (error: any) => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result: any) => {

                    this.user = result.user;

    })
    .catch( (error: any) => alert("codigo equivocado"));
  }

}