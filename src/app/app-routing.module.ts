import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import {  Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { AdminGuardGuard } from './pages/admin/guards/admin-guard.guard';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PreventLoggedinAccessGuard } from './pages/signin/guards/prevent-loggedin-access.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserGuardGuard } from './pages/user/guards/user-guard.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:"",
  component:HomeComponent,

},
  {path:"signup",
  component:SignupComponent,
  pathMatch:"full",
  canActivate:[PreventLoggedinAccessGuard],
},
{
  path:"signin",
  component:SigninComponent,

  pathMatch:"full",
  canActivate:[PreventLoggedinAccessGuard],
},
{path:"admin-dashboard",
component:AdminDashboardComponent,
canActivate:[AdminGuardGuard],
children:[
  {
    path:"",
    component:WelcomeComponent
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"categories",
    component:CategoriesComponent
  },
  {
    path:"quizzes",
    component:QuizzesComponent
  },
  {
    path:"add-category",
    component:AddCategoryComponent
  },
  {
    path:"add-quiz",
    component:AddQuizComponent
  },
  {
    path:"update-quiz",
    component:UpdateQuizComponent
  },



],
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
