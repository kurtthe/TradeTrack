import {environment} from '@env';

export const endPoints = {
  auth: `${environment.api}login`,
  resetPassword: `${environment.api}reset-password`,
  burdensBalance: `${environment.api}burdens/balance`,
  invoices: `${environment.api}burdens/invoices`
}
