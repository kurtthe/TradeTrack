import { environment } from '@env';

export const endPoints = {
  auth: `${environment.api}login`,
  resetPassword: `${environment.api}reset-password`,
  burdensBalance: `${environment.api}burdens/balance`,
  invoices: `${environment.api}burdens/invoices?sort=id_desc`,
  invoicesDetail: `${environment.api}burdens/:id?expand=structure,storeLocation&include_products=true`,
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
  products: `${environment.api}products`,

  setFavorite: `${environment.api}products/:id`,
  suppliers: `${environment.api}burdens/supplier`,

  categories: `${environment.api}products/categories`,
  productsCategories: `${environment.api}products/categories`,
  newPrice: `${environment.api}products/:id/price`,
  preferredStore: `${environment.api}burdens/stores/preferred`,
  shareOrder: `${environment.api}material-orders/:id/share`,
  orders: `${environment.api}material-orders?sort=id_desc&include_products=true`,
  estimatorRoofing: 'https://burdenstradetrakroofestimator.paperform.co/?email=:emailUser&name=:fullName&company=:companyName&burdens_account=:accountNumber',
  forgotPassword: `${environment.api}reset-password`,
};