import { Component } from '@angular/core';
import { CountrySearchInput } from '../../components/country-search-input/search-input.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInput, ListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  onSearch(value: string) {
    console.log(value);
  }
}
