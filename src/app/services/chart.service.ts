import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CompareSpeciesAmountForStores, SpeciesAmountForStores } from '../chart-menu/chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  // Adding /charts to url, because it is needed for each request
  private apiUrl = `${environment.apiUrl}/charts`;

  constructor(private http: HttpClient) { }

  // GET: api/charts/SpeciesAmountForStores
  getSpeciesAmountForStores(storeIds: number[]): Observable<SpeciesAmountForStores> {
    // Build id parameter list
    let params = new HttpParams();
    storeIds.forEach(id => {
      params = params.append('ids', id.toString());
    });

    return this.http.get<SpeciesAmountForStores>(`${this.apiUrl}/SpeciesAmountForStores`, { params }).pipe(
      catchError(this.handleError)
    );
  }

    // GET: api/charts/CompareSpeciesAmountForStores
    getCompareSpeciesAmountForStores(storeIds: number[]): Observable<CompareSpeciesAmountForStores> {
      // Build id parameter list
      let params = new HttpParams();
      storeIds.forEach(id => {
        params = params.append('ids', id.toString());
      });
  
      return this.http.get<CompareSpeciesAmountForStores>(`${this.apiUrl}/CompareSpeciesAmountForStores`, { params }).pipe(
        catchError(this.handleError)
      );
    }

  // Error handling method
  // TODO: improve messages
  // TODO: global error handling?
  private handleError(error: HttpErrorResponse): Observable<never> {

    let errorMessage = error.error.message;

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage))
  }
}
