import axios from 'axios';
import {HttpCommonService} from './http-common.service'
export class GeneralRequestService {
  static instance;
  httpService;

  constructor() {
    this.httpService = axios;
    this.httpCommonService = new HttpCommonService()
  }
  static getInstance() {
    if (!GeneralRequestService.instance) {
      GeneralRequestService.instance = new GeneralRequestService();
    }
    return GeneralRequestService.instance;
  }

  async post(endpoint, data) {
    try {
      const response =  await this.httpService.post(endpoint, data)
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err)
    }
  }

  async get(endpoint, options={}) {
    try {
      const response = await this.httpService.get(endpoint, {...options})
      return response.data
    } catch (err) {
      this.httpCommonService.handleError(err)
    }
  }
}
