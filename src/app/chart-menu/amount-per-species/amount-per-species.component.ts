import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import Chart from 'chart.js/auto';
import { SpeciesAmountForStores } from '../chart.model';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-amount-per-species',
  standalone: true,
  imports: [],
  templateUrl: './amount-per-species.component.html',
  styleUrl: './amount-per-species.component.css'
})
export class AmountPerSpeciesComponent {
  chart: any

  constructor(private storeService: StoreService, private chartService: ChartService) { }

  ngOnInit(): void {

    // Subscibe to selected stores
    this.storeService.selectedStores$.subscribe({
      next: (stores) => {
        if (stores.length > 0) {
          var ids = stores.map((store) => store.id);
          // Get new stocks & update chart with new data
          this.getStoresStock(ids);
        } else {
          // No stores, so no chart
          if (this.chart instanceof Chart) {
            this.chart.destroy();
            this.chart = null;
          }
        }

        console.info('Updated selected stores')
      },
      error: (e) => console.error('Error while updating selected stores: ', e)
    });
  }

  getStoresStock(ids: number[]): void {
    this.chartService.getSpeciesAmountForStores(ids).subscribe({
      next: (speciesAmountForStores: SpeciesAmountForStores) => {

        var speciesAmount = speciesAmountForStores.speciesAmount
        var xLabels = Object.keys(speciesAmount);
        var yLabels = Object.values(speciesAmount);

        // Rewrite chart with new data
        // Check if chart is already created
        if (this.chart instanceof Chart) {
          this.updateChart(this.chart, speciesAmountForStores.storeName, xLabels, yLabels)
        } else {
          this.chart = this.createChart(speciesAmountForStores.storeName ,xLabels, yLabels)
        }

      },
      error: (e) => console.error('Error while fetching stores: ', e),
      complete: () => {
        console.info('Fetched stock')
      }
    });
  }

  createChart(chartName: string, xLabels: any, yLabels:any): Chart {
    return new Chart('canvas', {
      type: 'bar',
      data: {
        labels: xLabels,
        datasets: [
          {
            label: 'Aantal dieren',
            data: yLabels,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title:{
            display: true,
            text: chartName,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateChart(chart: Chart, chartName:string, xLabels: any[], yLabels:any) {    
    chart.data.labels = xLabels;
    chart.data.datasets[0].data = yLabels;

    // Ensure the plugins and title exist before trying to access them
    // Otherwise error in ...titel.text assignment
    if (!chart.options.plugins) {
      chart.options.plugins = {};
    }
    if (!chart.options.plugins.title) {
      chart.options.plugins.title = {};
    }
    chart.options.plugins.title.text = chartName;

    chart.update()
  }
}
