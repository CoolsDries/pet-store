import { Component, Input } from '@angular/core';
import { Store } from '../../store.model';

@Component({
  selector: 'app-store-select-item',
  standalone: true,
  imports: [],
  templateUrl: './store-select-item.component.html',
  styleUrl: './store-select-item.component.css'
})
export class StoreSelectItemComponent {
  // Store object injected via parent component
  @Input() store!: Store;
}
