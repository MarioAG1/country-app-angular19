import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';

//Este es el mapper, desde la primera manera, en el servicio esta la otra manera

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      //   capital: country.capital?.[0] ?? '', //La primera capital o vacio
      capital: restCountry.capital.join(','), //Poner ambas capitales
      population: restCountry.population,
    };
  }

  static mapRestCountryToCountryArray(restCountry: RESTCountry[]): Country[] {
    // Tarea Mapper
    // Asi es como se hace, pero se utiliza la de abajo,
    // ya que cuando hay una seria de argumentos y estos son unicamente enviados en un callback
    // como argumentos a otra funcion, se puede enviar por referencia, es decir se pueden quitar

    // return restCountry.map((country) => this.mapRestCountryToCountry(country));

    return restCountry.map(this.mapRestCountryToCountry);
  }
}
