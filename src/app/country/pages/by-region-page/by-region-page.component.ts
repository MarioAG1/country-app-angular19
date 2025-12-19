import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/list/country-list.component';
import { Region } from '../../interfaces/regions.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  //140 Tarea Regiones

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  // Asi o directamente desde el html, me gusta mas HTML por que una las cosas
  // selectRegion(region: Region) {
  //   this.selectedRegion.set(region);
  // }

  selectedRegion = signal<Region | null>(null);
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      // Para ver que recibe la peticion
      // console.log('Request recibido:', request);
      if (!request.query) return of([]);
      return this.countryService.searchByRegion(request.query);
    },
  });
}
