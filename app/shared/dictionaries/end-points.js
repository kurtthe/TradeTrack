import { environment } from '@env';

const apiService = environment.production ? environment.api: environment.apiTest

export const endPoints = {
  auth: `${apiService}login`,
  resetPassword: `${apiService}reset-password`,
  burdensBalance: `${apiService}burdens/balance`,
  invoices: `${apiService}burdens/invoices?sort=id_desc`,
  invoicesDetail: `${apiService}burdens/:id?expand=structure,storeLocation&include_products=true`,
  invoicesDetailWTracking: `${apiService}burdens/:id?expand=tracking,storeLocation&include_products=true`,
  downloadInvoicesDetail: `${apiService}burdens/invoices/:id/download?base64=true`,
  news: `${apiService}news`,
  statements: `${apiService}burdens/statements?sort=id_desc`,
  downloadStatementDetail: `${apiService}burdens/statements/:id/download?base64=true`,
  searchInvoices: `${apiService}burdens/search?sort=id_desc`,
  payment: `${apiService}burdens/payment`,
  generateOrder: `${environment.api}material-orders`,
  supplierId: `${apiService}burdens/supplier`,
  stores: `${apiService}burdens/stores`,
  jobs: `${apiService}jobs`,
  products: `${apiService}products`,

  setFavorite: `${apiService}products/:id/favourite`,
  suppliers: `${apiService}burdens/supplier`,

  categories: `${apiService}products/categories`,
  productsCategories: `${apiService}products/categories`,
  newPrice: `${apiService}products/:id/price`,
  preferredStore: `${apiService}burdens/stores/preferred`,
  shareOrder: `${apiService}material-orders/:id/share`,
  orders: `${apiService}material-orders?sort=id_desc&include_products=true`,
  estimatorRoofing: 'https://burdenstradetrakroofestimator.paperform.co/?email=:emailUser&name=:fullName&company=:companyName&burdens_account=:accountNumber',
  forgotPassword: `${apiService}reset-password`,

  getValidationRules: `${environment.apiStagin}burdens/validation-rules`
};