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
    this.showError(error.response);
  }

  showError(appError) {
    const description = appError.data.message;
    const title = 'Opps!';
    this.alertService.show(title, description);
  }

  showAlertOffline() {
    this.alertService.show('Opps!', 'No connection internet.');
  }

}