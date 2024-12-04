/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './ui/configs/app.config';
import { MainLayoutComponent } from './ui/standalone/main-layout/main-layout.component';

bootstrapApplication(MainLayoutComponent, appConfig).catch((err) =>
  console.error(err)
);
