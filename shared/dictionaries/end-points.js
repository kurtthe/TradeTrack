import {environment} from '../../environments/environment';

export const endPoints = {
  auth: `${environment.api}login`,
  resetPassword: `${environment.api}reset-password`,
}
