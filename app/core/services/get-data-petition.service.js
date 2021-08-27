import { GeneralRequestService } from '@core/services/general-request.service';

export class GetDataPetitionService {
  static instance;

  constructor(){
    this.generalRequest = GeneralRequestService.getInstance();
  }

  static getInstance() {
    if (!GetDataPetitionService.instance) {
      GetDataPetitionService.instance = new GetDataPetitionService();
    }
    return GetDataPetitionService.instance;
  }

  async getInfo(endpoint, action = false) {
    const response = await this.generalRequest.get(endpoint, {
      params:{'page': 1, 'per-page':5},
    });
    action && action(response);
    return response;
  }

  async getInfo2(endpoint, action = false) {
    const response = await this.generalRequest.get(endpoint, {
      params:{'page': 1, 'per-page':12},
    });
    action && action(response);
    return response;
  }

}



