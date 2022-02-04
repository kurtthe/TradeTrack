import { environment } from '@env';

export const endPoints = {
  auth: `${environment.api}login`,
  resetPassword: `${environment.api}reset-password`,
  burdensBalance: `${environment.api}burdens/balance`,
  invoices: `${environment.api}burdens/invoices?sort=id_desc`,
  invoicesDetail: `${environment.api}burdens/:id?expand=structure,storeLocation`,
  downloadInvoicesDetail: `${environment.api}burdens/invoices/:id/download?base64=true`,
  news: `${environment.api}news`,
  statements: `${environment.api}burdens/statements?sort=id_desc`,
  downloadStatementDetail: `${environment.api}burdens/statements/:id/download?base64=true`,
  searchInvoices: `${environment.api}burdens/search?sort=id_desc`,
  payment: `${environment.api}burdens/payment`,
  generateOrder: `${environment.api}material-orders`,
  supplierId: `${environment.api}burdens/supplier`,
  stores: `${environment.api}burdens/stores`,
  jobs: `${environment.api}jobs`,
  subcategories: `${environment.api}products/categories?per-page=50&expand=products&parent_category_id=:codeCategoryId`,
  products: `${environment.api}products?supplier_id=:id`,
  suppliers: `${environment.api}burdens/supplier`,
  categories: `${environment.api}burdens/categories?expand=products`,
  newPrice: `${environment.api}products/:id/price`,
  preferredStore: `${environment.api}burdens/stores/preferred`
};