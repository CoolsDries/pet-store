import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import Chart from 'chart.js/auto';
import { ChartDatasets, ChartDatasetsData, CompareSpeciesAmountForStores, SpeciesAmountForStores } from '../chart.model';
import { ChartService } from '../../services/chart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amount-per-species',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amount-per-species.component.html',
  styleUrl: './amount-per-species.component.css'
})
export class AmountPerSpeciesComponent {
  chartNormal: any
  chartCompare: any

  chartsToCompare: boolean = false
  showCompareChart: boolean = false

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

  destroyChart(chart: any) : Chart {
    if (chart instanceof Chart) {
      chart.destroy();
      chart = null;
    }
    return chart;
  }

  manageCharts(ids: number[]) {
    this.showCompareChart = false;
    
    if (ids.length <= 0) {
      // No stores, so no chart to display
      this.chartNormal = this.destroyChart(this.chartNormal);
      this.chartCompare = this.destroyChart(this.chartCompare);
      this.chartsToCompare = false

    } else {
      // Set visibilty of compare button
      if (ids.length > 1) {
        this.chartsToCompare = true
      } else {
        this.chartsToCompare = false
      }

      // Get required data
      // Generate both charts, to minimize API calls. Only show the needed

      //Generate compare chart
      this.chartService.getSpeciesAmountForStores(ids).subscribe({
        next: (speciesAmountForStores: SpeciesAmountForStores) => {
          // Generate new data
          var data = this.generateChartData([speciesAmountForStores])

          this.chartNormal = this.createOrUpdateChart(this.chartNormal, "canvasNormal", speciesAmountForStores.name, data);
        },
        error: (e) => console.error('Error while fetching chart data: ', e),
        complete: () => {
          console.info('Fetched chart data')
        }
      });

      // Generate thogether chart
      this.chartService.getCompareSpeciesAmountForStores(ids).subscribe({
        next: (compareSpeciesAmountForStores: CompareSpeciesAmountForStores) => {
          // Generate new data
          var data = this.generateChartData(compareSpeciesAmountForStores.stores);

          this.chartCompare = this.createOrUpdateChart(this.chartCompare, "canvasCompare", compareSpeciesAmountForStores.name, data);
        },
        error: (e) => console.error('Error while fetching chart data: ', e),
        complete: () => {
          console.info('Fetched chart data')
        }
      });

      // Show right chart
      this.chartToggle();
    }
  }

  chartToggle() {
    const canvasNormal = document.getElementById("canvasNormal");
    const canvasCompare = document.getElementById("canvasCompare")
    // Display right chart
    if (this.showCompareChart) {
      if (canvasNormal) canvasNormal.style.display = "none";
      if (canvasCompare) canvasCompare.style.display = "";
      this.showCompareChart = false
    } else {
      if (canvasCompare) canvasCompare.style.display = "none";
      if (canvasNormal) canvasNormal.style.display = "";
      this.showCompareChart = true
    }
  }

  createOrUpdateChart(chart: any, chartId: string, chartName: string, datasets: any): Chart {
    if (chart instanceof (Chart)) {
      // Rewrite chart with new data
      chart = this.updateChart(chart, chartName, datasets);
    } else {
      // Creat new chart
      chart = this.createChart(chartId, chartName, datasets);
    }
    return chart;
  }

  updateChart(chart: Chart, chartName: string, datasets: any) {
    // Update datasets
    chart.data.datasets = datasets;

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

    return chart;
  }

  createChart(chartId: string, chartName: string, datasets: any): Chart {
    return new Chart(chartId, {
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
  generateChartData(speciesAmountForStores: SpeciesAmountForStores[]): ChartDatasets[] {
    var datasets: ChartDatasets[] = [];

    speciesAmountForStores.forEach((speciesAmountForStore) => {
      // Map data to dataset
      var newData: ChartDatasetsData[] = [];
      Object.entries(speciesAmountForStore.speciesAmounts).forEach(([key, value]) => {
        newData.push({
          x: key, y: value
        })
      });

      datasets.push({
        label: speciesAmountForStore.name,
        data: newData
      })
    });

    return datasets;
  }
}
