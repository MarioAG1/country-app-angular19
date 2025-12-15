import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  // Lo vamos a hacer con un spanshot en vez de un Observable
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchByCountryByAlphaCode(request.code);
    },
  });
}
