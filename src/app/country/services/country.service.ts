import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  //Si hay intercacion con el DOM o la web y verse reflejado, se debe utilizar señales en este caso no
  private queryCacheCapital = new Map<string, Country[]>(); // Objeto vacio
  private queryCacheCountry = new Map<string, Country[]>(); // Objeto vacio

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    // Al poner of, lo tranforma a un observable y podemos poner .pipe con todo los datos
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log('LLegando al servidor por ' + query);

    // 2 Hacemos que el tipo de retorno sea igual a RESTCounty y a la vez lo cambiamos en el by-capital-page.ts
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      // Tarea Mapper, con esto pasamos la informacion de la API hacia nuestra interfaz en vez de consumirla directamente
      //
      // Lo mismo, se puede evitar la referencia
      // map((restCountries) =>
      //   CountryMapper.mapRestCountryToCountryArray(restCountries)
      // )

      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se puedo obtener paises con esa ${query}`)
        );
      })
    );
  }

  // 126. Tarea Pais
  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    // Si lo hacemos asi, recibimos parte del contenido, pero banderas y nombres apareceran como object object
    // return this.http.get<Country[]>(`${API_URL}/name/${query}`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se puedo obtener paises con esa ${query}`)
        );
      })
    );
  }

  searchByCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryToCountryArray(resp)),
      map((countries) => countries.at(0)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se puedo obtener paises con esa ${code}`)
        );
      })
    );
  }
}
