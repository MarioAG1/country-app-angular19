import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/list/country-list.component';
import { Region } from '../../interfaces/regions.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  //Cambiamos de signal a linked signal, para hacerlo dinamico
  selectedRegion = linkedSignal<Region>(() => this.queryParam ?? 'Americas');
  countryService = inject(CountryService);

  //Para obtner datos a partir de la url
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam =
    (this.activatedRoute.snapshot.queryParamMap.get('region') as Region) ?? '';

  countryResource = rxResource({
    request: () => ({ query: this.selectedRegion() }),
    loader: ({ request }) => {
      // Para ver que recibe la peticion
      // console.log('Request recibido:', request);
      if (!request.query) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: request.query,
        },
      });
      return this.countryService.searchByRegion(request.query);
    },
  });
}
