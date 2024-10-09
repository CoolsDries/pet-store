import { Component } from '@angular/core';
import { Store } from '../../store-menu/store.model';
import { Species } from '../../species/species.module';
import { AnimalService } from '../../services/animal.service';
import { SpeciesService } from '../../services/species.service';
import { StoreService } from '../../services/store.service';
import { Animal } from '../animal.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-animal.component.html',
  styleUrl: './add-animal.component.css'
})
export class AddAnimalComponent {
  animalForm: FormGroup;

  stores: Store[] = [];
  species: Species[] = [];

  constructor(private fb: FormBuilder, private animalService: AnimalService, private storeService: StoreService, private speciesService: SpeciesService) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      storeId: [0, Validators.required],
      speciesId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadStores();
    this.loadSpecies();

    // First set baseprice, after give possibilty to change price
    // Disable the price field initially
    const priceField = this.animalForm.get('price');
    if (priceField) {
      priceField.disable();

      // update if a species is choosen
      this.animalForm.get('speciesId')?.valueChanges.subscribe(speciesId => {
        const selectedSpecies = this.species.find(s => s.id == speciesId);
        
        if (selectedSpecies) {
          // Enable the price field and set basePrice 
          priceField.setValue(selectedSpecies.basePrice);
          priceField.enable();
        } else {
          // no species is selected, disable price field
          priceField.disable();
        }
      });
    }
  }

  loadStores() {
    this.storeService.getStores().subscribe((stores) => {
      this.stores = stores;
    });
  }

  loadSpecies() {
    this.speciesService.getSpecies().subscribe((species) => {
      this.species = species;
    });
  }

  addAnimal() {
    if (this.animalForm.valid) {
      this.animalService.addAnimal(this.animalForm.value).subscribe({
        next: (result) => {
          alert('Animal added successfully!');
          this.animalForm.reset();
        },
        error: (error) => {
          alert('Failed to add animal: ' + error.message);
        }
      });
    }
    // TODO unvaild handling
  }
}
