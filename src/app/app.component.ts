import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimalComponent } from './animal/animal/animal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AnimalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store';
}
