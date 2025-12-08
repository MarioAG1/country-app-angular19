import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayout } from './layouts/CountryLayout/CountryLayout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';

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
        path: 'by-country',
        component: ByCountryPageComponent,
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent,
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
