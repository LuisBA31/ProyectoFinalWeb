import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'phone-login', component: PhoneLoginComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'home', component: HomeComponent},
  {path: 'menu-admin', component: MenuAdminComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
