import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { SignUpComponent } from './features/authentication/sign-up/sign-up.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { HomePageComponent } from './features/homePage/home-page.component';
export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,       
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
    {
        path: 'home-page',
        component: HomePageComponent,
    }
];
