import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  //3 Hacemos el input, es decir los datos que le tienen que llegar
  //Tarea Mapper, cambiamos el RestCountry, por nuestra interfaz
  countries = input.required<Country[]>();
}
