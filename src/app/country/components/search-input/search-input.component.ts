import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  value = output<string>();
  placeholder = input<string>();

  // Esta es 1 opcion, la 2 opcion es directamente desde el HTML
  // onSearch(value: string) {
  //   this.searchValue.emit(value);
  // }
}
