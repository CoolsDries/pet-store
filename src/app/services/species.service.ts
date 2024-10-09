import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Species } from '../species/species.module';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  // Adding /Species to url, because it is needed for each request
  private apiUrl = `${environment.apiUrl}/Species`;

  constructor(private http: HttpClient) { }

  // GET: api/Species
  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET: api/Species/{id}
  getSpeciesById(id: number): Observable<Species> {
    return this.http.get<Species>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // PUT: api/Species/{id}
  updateSpecies(id: number, species: Species): Observable<Species> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Species>(`${this.apiUrl}/${id}`, species, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // POST: api/Species
  addSpecies(species: Species): Observable<Species> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Species>(this.apiUrl, species, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE: api/Species/{id}
  deleteSpecies(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
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
