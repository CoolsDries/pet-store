import { Component, Input } from '@angular/core';
import { Store } from '../store.model';

@Component({
  selector: 'app-store-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './store-menu-item.component.html',
  styleUrl: './store-menu-item.component.css'
})
export class StoreMenuItemComponent {
  // Store object injected via parent component
  @Input() store!: Store;
}
