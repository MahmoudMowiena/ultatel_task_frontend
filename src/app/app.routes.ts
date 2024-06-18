import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate:[noAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate:[noAuthGuard] },
    { path: 'home', component: StudentListComponent, canActivate:[authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path:"**",component:NotfoundComponent }
];
