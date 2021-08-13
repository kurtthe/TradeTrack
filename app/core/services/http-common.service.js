import {AlertService} from './alert.service'

export class HttpCommonService {
  constructor() {
    this.alertService = new AlertService()
  }

  handleError(error){

    if(error.response.status === 0) {
      this.showAlertOffline();
      return
    }

    if(error.response.status === 403) {
      this.showAlertNotAuth('Opps!', 'Not Authenticated.');
      return
    }

    this.showError(error.response);
  }

  showError(appError, title ="Opps!", message=false) {
    const description = (message)? message: appError.data.message;
    this.alertService.show(title, description);
  }

  showAlertOffline() {
    this.alertService.show('Opps!', 'No connection internet.');
  }

}