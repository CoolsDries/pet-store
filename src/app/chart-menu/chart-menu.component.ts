import { Component } from '@angular/core';
import { AmountPerSpeciesComponent } from './amount-per-species/amount-per-species.component';

@Component({
  selector: 'app-chart-menu',
  standalone: true,
  imports: [AmountPerSpeciesComponent],
  templateUrl: './chart-menu.component.html',
  styleUrl: './chart-menu.component.css'
})
export class ChartMenuComponent {

}
