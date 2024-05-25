import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './autenticar-usuario/autenticar-usuario.component';
import { dashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: 'dashboard',
        component: dashboardComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/autenticar-usuario'
    }
];
