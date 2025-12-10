import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();

    // 2 Hacemos que el tipo de retorno sea igual a RESTCounty y a la vez lo cambiamos en el by-capital-page.ts
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`);
  }
}
