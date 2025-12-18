import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  value = output<string>();
  placeholder = input<string>();
  debounceTime = input.required<number>();
  inputValue = signal('');

  debounceEffect = effect((onCleanUp) => {
    //Cuando se detecta que hay una señal y esta cambie, activara el efecto
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanUp(() => {
      clearTimeout(timeout);
    });
  });

  // Esta es 1 opcion, la 2 opcion es directamente desde el HTML
  // onSearch(value: string) {
  //   this.searchValue.emit(value);
  // }
}
