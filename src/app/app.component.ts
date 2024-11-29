import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NavComponent } from './login/nav/nav.component';
import { ProductServiceImpl } from '../domain/product/internal/ProductServiceImpl';
import { domainDeps } from './app.domainDeps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [...domainDeps],
})
export class AppComponent {
  title = 'dajf';
}
