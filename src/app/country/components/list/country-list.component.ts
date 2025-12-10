import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  //3 Hacemos el input, es decir los datos que le tienen que llegar
  countries = input.required<RESTCountry[]>();
}
