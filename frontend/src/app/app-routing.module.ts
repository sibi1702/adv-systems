import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: UserComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
