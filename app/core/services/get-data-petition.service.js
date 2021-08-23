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

  async getInfo(endpoint, token=false, action = false) {
    const response = await this.generalRequest.get(endpoint, {
      params:{'page': 1, 'per-page':5},
      headers: { 'ttrak-key': (!token)? '': token },
    });
    action && action(response);
    return response;
  }
}

