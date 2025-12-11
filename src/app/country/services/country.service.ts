import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    // 2 Hacemos que el tipo de retorno sea igual a RESTCounty y a la vez lo cambiamos en el by-capital-page.ts
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      // Tarea Mapper, con esto pasamos la informacion de la API hacia nuestra interfaz en vez de consumirla directamente
      //
      // Lo mismo, se puede evitar la referencia
      // map((restCountries) =>
      //   CountryMapper.mapRestCountryToCountryArray(restCountries)
      // )
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se puedo obtener paises con esa ${query}`)
        );
      })
    );
  }
}
