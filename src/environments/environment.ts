
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
export const environment = {
  apiKey: "AIzaSyBzNSjDqDMolBbWBx58eFDI8UYtJLjYyaw",
  authDomain: "requiemgeekshop.firebaseapp.com",
  projectId: "requiemgeekshop",
  storageBucket: "requiemgeekshop.appspot.com",
  messagingSenderId: "246133176804",
  appId: "1:246133176804:web:bc564b8c33f60fec372ff1"
};

// Initialize Firebase
const app = initializeApp(environment);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
