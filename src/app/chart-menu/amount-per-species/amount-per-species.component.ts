import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import Chart from 'chart.js/auto';
import { CompareSpeciesAmountForStores, SpeciesAmountForStores } from '../chart.model';
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
  compare: boolean = false;

  constructor(private storeService: StoreService, private chartService: ChartService) { }

  ngOnInit(): void {

    // Subscibe to selected stores
    this.storeService.selectedStores$.subscribe({
      next: (stores) => {

        var ids = stores.map((store) => store.id);
        this.manageCharts(ids);

        console.info('Updated selected stores')
      },
      error: (e) => console.error('Error while updating selected stores: ', e)
    });
  }

  // TODO make compare observable
  changeCompare() {
    this.compare = !this.compare
  }

  destroyChart() {
    if (this.chart instanceof Chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  manageCharts(ids: number[]) {
    if (ids.length <= 0) {
      // No stores, so no chart to display
      this.destroyChart();
    } else {
      // Get required data
      if (this.compare) {
        // Use compare chart
        this.chartService.getCompareSpeciesAmountForStores(ids).subscribe({
          next: (compareSpeciesAmountForStores: CompareSpeciesAmountForStores) => {
            // Generate new data
            var data = this.generateChartData(compareSpeciesAmountForStores.stores)
            // Rewrite chart with new data

            this.updateChart(compareSpeciesAmountForStores.name, data);
          },
          error: (e) => console.error('Error while fetching chart data: ', e),
          complete: () => {
            console.info('Fetched chart data')
          }
        });
      } else {
        //Use not compare chart
        this.chartService.getSpeciesAmountForStores(ids).subscribe({
          next: (speciesAmountForStores: SpeciesAmountForStores) => {
            // Generate new data
            var data = this.generateChartData([speciesAmountForStores])
            // Rewrite chart with new data
            this.updateChart(speciesAmountForStores.name, data);
          },
          error: (e) => console.error('Error while fetching chart data: ', e),
          complete: () => {
            console.info('Fetched chart data')
          }
        });
      }
    }
  }

  updateChart(chartName: string, datasets: any) {
    console.log("update chart")
    // Check if chart is already created
    if (!(this.chart instanceof Chart)) {
      this.createChart(chartName, datasets);
    } else {
      // Update datasets
      this.chart.data.datasets = datasets;

      // Ensure the plugins and title exist before trying to access them
      // Otherwise error in ...titel.text assignment
      if (!this.chart.options.plugins) {
        this.chart.options.plugins = {};
      }
      if (!this.chart.options.plugins.title) {
        this.chart.options.plugins.title = {};
      }
      this.chart.options.plugins.title.text = chartName;

      this.chart.update()
    }
  }

  createChart(chartName: string, datasets: any) {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        datasets: datasets
      },
      options: {
        plugins: {
          title: {
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

  // TODO: optimize
  generateChartData(speciesAmountForStores: SpeciesAmountForStores[]) {
    var datasets: { label: string; data: { x: string; y: number; }[] }[] = [];

    speciesAmountForStores.forEach((speciesAmountForStore) => {
      // Map data to dataset
      var newData: { x: string; y: number; }[] = [];
      Object.entries(speciesAmountForStore.speciesAmounts).forEach(([key, value]) => {
        newData.push({
          x: key, y: value
        })
      });

      datasets.push({
        label: speciesAmountForStore.name,
        data: newData
      })
      newData = [];
    });

    return datasets;
  }
}
