import { Component } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../animal.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animal.component.html',
  styleUrl: './animal.component.css'
})
export class AnimalComponent {
  
  animals: Animal[] = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalService.getAnimals().subscribe(
      (data: Animal[]) => {
        this.animals = data;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }
}
