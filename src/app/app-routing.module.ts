import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminGuardGuard } from './pages/admin/guards/admin-guard.guard';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserGuardGuard } from './pages/user/guards/user-guard.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:"",
  component:HomeComponent,
  pathMatch:"full"
},
  {path:"signup",
  component:SignupComponent,
  pathMatch:"full"
},
{
  path:"signin",
  component:SigninComponent,
  pathMatch:"full"
},
{path:"admin-dashboard",
component:AdminDashboardComponent,
pathMatch:"full",
canActivate:[AdminGuardGuard],
},
{path:"user-dashboard",
component:UserDashboardComponent,
pathMatch:"full",
canActivate:[UserGuardGuard],
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
