import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: ''}
];

NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 export const routing = RouterModule.forRoot(routes);
