import {environment} from '@env';

export const endPoints = {
  auth: `${environment.api}login`,
  resetPassword: `${environment.api}reset-password`,
  burdensBalance: `${environment.api}burdens/balance`,
  invoices: `${environment.api}burdens/invoices`,
  invoicesDetail: `${environment.api}burdens/invoices/:id?expand=structure,storeLocation`,
  downloadInvoicesDetail: `${environment.api}burdens/invoices/:id/download?rrp=true`,
  news: `${environment.api}news`,
  statements: `${environment.api}burdens/statements`,
  downloadStatementDetail: `${environment.api}burdens/statements/:id/download`,
  searchInvoices : `${environment.api}burdens/search`,
  payment : `${environment.api}burdens/payment`,
  generateOrder: `${environment.api}material-orders`,
  supplierId: `${environment.api}burdens/supplier`,
  stores: `${environment.api}burdens/stores`,
  jobs: `${environment.api}jobs`
}
