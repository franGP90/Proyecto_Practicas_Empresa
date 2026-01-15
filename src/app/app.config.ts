import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FakeBackendInterceptor } from './services/mockBackEnd.service';

export const appConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(
      withInterceptors([
        AuthInterceptor,
        FakeBackendInterceptor
      ])
    ),
    provideRouter(routes)
  ]
};
