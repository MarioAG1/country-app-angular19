import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/list/country-list.component';
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-countries.interface';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  // 125. Esto remplazaria todo lo de abajo
  query = signal('');
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) {
        return [];
      }
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    },
  });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);

  //  1 Cambiamos a tipo RestCountry igual que el servicio, para evitar el error de asignar argumentos
  //  Tarea Mapper, cambiamos el RestCountry por la interfaz neustra
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading() === true) {
  //     return;
  //   }

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(error);
  //     },
  //   });
  // }
}
