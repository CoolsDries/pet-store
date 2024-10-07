import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Store } from './store.model';
import { CommonModule } from '@angular/common';
import { StoreMenuItemComponent } from './store-menu-item/store-menu-item.component';
import { StoreSelectComponent } from './store-select/store-select.component';

@Component({
  selector: 'app-store-menu',
  standalone: true,
  imports: [CommonModule, StoreMenuItemComponent, StoreSelectComponent],
  templateUrl: './store-menu.component.html',
  styleUrl: './store-menu.component.css'
})
export class StoreMenuComponent implements AfterViewInit {
  selectedStores: Store[] = [];
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;
  
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    // Subscibe to selected stores
    this.storeService.selectedStores$.subscribe({
      next: (stores) => {
        this.selectedStores = stores
        console.info('Updated selected stores')
      },
      error: (e) => console.error('Error while updating selected stores: ', e)
    });
  }

  ngAfterViewInit() {
    this.dialog.nativeElement.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.nodeName === 'DIALOG') {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.dialog.nativeElement.close();
    this.dialog.nativeElement.classList.remove('opened');
  }

  openModal() {
    this.dialog.nativeElement.showModal();
    this.dialog.nativeElement.classList.add('opened');
  }
}
