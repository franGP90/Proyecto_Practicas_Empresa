import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { SignUpComponent } from './features/authentication/sign-up/sign-up.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { HomePageComponent } from './features/homePage/home-page.component';
import { BookPurchasePageComponent } from './features/book-purchase-page/book-purchase-page.component';
import { PurchaseStepsComponent } from './features/book-purchase-page/purchase-steps/purchase-steps.component';
import { authGuard } from './services/auth.guard';
import { MyAccountComponent } from './features/my-account/my-account.component';
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
        canActivate: [authGuard],
    },
    {
        path: 'my-account',
        component: MyAccountComponent,
        canActivate: [authGuard],
    },
    {
        path: 'book-purchase/:id',
        component: BookPurchasePageComponent,
        canActivate: [authGuard],  
    },
    {
        path: 'purchase-steps/:id',
        component: PurchaseStepsComponent,
        canActivate: [authGuard],
    }
];
