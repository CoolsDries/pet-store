import { Component, EventEmitter, Output } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../store.model';
import { StoreSelectItemComponent } from './store-select-item/store-select-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-select',
  standalone: true,
  imports: [StoreSelectItemComponent, CommonModule],
  templateUrl: './store-select.component.html',
  styleUrl: './store-select.component.css'
})
export class StoreSelectComponent {
  // List of al stores to choose from
  stores: Store[] = [];
  // List of al selected stores
  selectedStores: Store[] = [];

  // Output emmiter to close modal
  @Output() closeModalEmitter = new EventEmitter<void>();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getStores();
  }

  getStores(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => this.stores = stores,
      error: (e) => console.error('Error while fetching stores: ', e),
      complete: () => console.info('Fetched stores')
    });
  }

  onCheckboxChange(store: Store, event: any): void {
    if (event.target.checked) {
      this.selectedStores.push(store);
    } else {
      // Remove store from selectedStores
      const index = this.selectedStores.indexOf(store);
      // Check if index exist
      if (index > -1) {
        this.selectedStores.splice(index, 1);
      }
    }
  }

  onSelectStores(): void {
    this.storeService.setSelectedStores(this.selectedStores);
    // Close current modal
    this.closeModalEmitter.emit();
  }

}
