import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpeciesService } from '../../services/species.service';

@Component({
  selector: 'app-add-species',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-species.component.html',
  styleUrl: './add-species.component.css'
})
export class AddSpeciesComponent {
  speciesForm: FormGroup; 

  constructor(private fb: FormBuilder, private speciesService: SpeciesService) {
    this.speciesForm = this.fb.group({
      name: ['', Validators.required],
      basePrice: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  addSpecies() {
    if (this.speciesForm.valid) {
      this.speciesService.addSpecies(this.speciesForm.value).subscribe({
        next: (result) => {
          alert('Species added successfully!');
          this.speciesForm.reset();
        },
        error: (error) => {
          alert('Failed to add species: ' + error.message);
        }
      });
    }
    // TODO unvaild handling
  }
}
