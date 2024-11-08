import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Animal } from '../animal/animal.model';
import { Species } from '../species/species.module';
import { Store } from '../store-menu/store.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // Adding /stores to url, because it is needed for each request
  private apiUrl = `${environment.apiUrl}/stores`;

  // Selected stores List
  private selectedStores = new BehaviorSubject<Store[]>([]);
  // Public observable, that notifices all listeners when selectedStores is updated.
  selectedStores$ = this.selectedStores.asObservable();

  constructor(private http: HttpClient) { }

  // GET: api/Stores
  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET: api/Stores/{id}
  getStoreById(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // PUT: api/Stores/{id}
  updateStore(id: number, store: Store): Observable<Store> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Store>(`${this.apiUrl}/${id}`, store, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // POST: api/Stores
  addStore(store: Store): Observable<Store> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Store>(this.apiUrl, store, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE: api/Stores/{id}
  deleteStore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  setSelectedStores(stores: Store[]): void {
    this.selectedStores.next(stores);
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
