import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginPage} from "./pages/login/login.page";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {IonicModule} from "@ionic/angular";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'article-page/:id',
    loadChildren: () => import('./pages/article-page/article-page.module').then( m => m.ArticlePagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'user-page',
    loadChildren: () => import('./pages/user-page/user-page.module').then( m => m.UserPagePageModule),
    //canActivate: [AuthGuard]
  },  {
    path: 'modify-user',
    loadChildren: () => import('./pages/modify-user/modify-user.module').then( m => m.ModifyUserPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations:[],
  exports: [RouterModule]
})
export class AppRoutingModule {}
