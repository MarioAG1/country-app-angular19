import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayout } from './layouts/CountryLayout/CountryLayout.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

//Hacemos esto para evitar ((m) => (m.countryRotues))
export default countryRoutes;
