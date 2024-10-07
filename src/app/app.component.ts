import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalComponent } from './animal/animal/animal.component';
import { StoreMenuComponent } from './store-menu/store-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimalComponent, StoreMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';
}
