import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Animal } from '../animal/animal.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  // Adding /animals to url, because it is needed for each request
  private apiUrl = `${environment.apiUrl}/animals`;

  constructor(private http: HttpClient) { }

  // Returns all animals
  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );;
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal).pipe(
      catchError(this.handleError)
    );;
  }

  updateAnimal(id: number, animal: Animal): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, animal).pipe(
      catchError(this.handleError)
    );;
  }

  deleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );;
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
