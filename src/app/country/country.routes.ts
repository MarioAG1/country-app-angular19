import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: ByCapitalPageComponent,
  },
];

//Hacemos esto para evitar ((m) => (m.countryRotues))
export default countryRoutes;
