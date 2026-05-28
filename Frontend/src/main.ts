import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // <-- Apunta a app.ts pero importa App

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));