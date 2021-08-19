import {environment} from '@env';

export const endPoints = {
  auth: `${environment.api}login`,
  resetPassword: `${environment.api}reset-password`,
  burdensBalance: `${environment.api}burdens/balance`,
  invoices: `${environment.api}burdens/invoices`,
  invoicesDetail: `${environment.api}burdens/invoices/:id?expand=structure,storeLocation`,
  downloadInvoicesDetail: `${environment.api}burdens/invoices/:id/download`,
  news: `${environment.api}news`,
}
