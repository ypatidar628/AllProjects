import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  //Category Routes
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('./components/manage/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'admin/categories/add',
    loadComponent: () =>
      import('./components/manage/category-form/category-form.component').then(
        (m) => m.CategoryFormComponent
      ),
  },
  {
    path: 'admin/categories/:id',
    loadComponent: () =>
      import('./components/manage/category-form/category-form.component').then(
        (m) => m.CategoryFormComponent
      ),
  },

  //Brand Routes
  {
    path: 'admin/brands',
    loadComponent: () =>
      import('./components/manage/brands/brands.component').then(
        (m) => m.BrandsComponent
      ),
  },
  {
    path: 'admin/brands/add',
    loadComponent: () =>
      import('./components/manage/brand-form/brand-form.component').then(
        (m) => m.BrandFormComponent
      ),
  },
  {
    path: 'admin/brands/:id',
    loadComponent: () =>
      import('./components/manage/brand-form/brand-form.component').then(
        (m) => m.BrandFormComponent
      ),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
