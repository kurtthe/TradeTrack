import axios from 'axios';
import {HttpCommonService} from './http-common.service'
import * as SecureStore from "expo-secure-store";

export class GeneralRequestService {
  static instance;
  httpService;

  constructor() {
    this.httpService = axios;
    this.httpCommonService = new HttpCommonService()
    this.getToken().then((data)=>{
      this.tokeAuth = data
    })
  }
  static getInstance() {
    if (!GeneralRequestService.instance) {
      GeneralRequestService.instance = new GeneralRequestService();
    }
    return GeneralRequestService.instance;
  }

  async getToken(){
    return await SecureStore.getItemAsync('api_key');
  }
  

  async post(endpoint, data, options={}) {
    try {
      const response =  await this.httpService.post(endpoint, data,{
        headers: { 'ttrak-key': this.tokeAuth || '' },
        ...options
      })
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err)
    }
  }

  async get(endpoint, options={}) {
    try {
      const response = await this.httpService.get(endpoint, {
        headers: { 'ttrak-key': this.tokeAuth || '' },
        ...options
      })
      return response.data
    } catch (err) {
      this.httpCommonService.handleError(err)
    }
  }
}
