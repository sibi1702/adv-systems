import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { UserprofileComponent } from "./userprofile/userprofile.component";


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: UserComponent },
  { path: 'userprofile', component: UserprofileComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
