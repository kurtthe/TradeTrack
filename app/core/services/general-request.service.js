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
    const data =  await SecureStore.getItemAsync('data_user');
    const dataParse = JSON.parse(data)
    return dataParse?.api_key
  }
  

  async post(endpoint, data, saveToken=false) {
    try {
      const response =  await this.httpService.post(endpoint, data,{
        headers: { 'ttrak-key': this.tokeAuth || '' }
      })
      if(saveToken){
        this.saverToken(response.data)
      }
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err)
    }
  }

  async get(endpoint, options={}) {
    console.log("==>this.tokeAut",this.tokeAut)
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

 async put(endpoint, data, options={}) {
    try {
      const response =  await this.httpService.put(endpoint, data,{
        headers: { 'ttrak-key': this.tokeAuth || '' },
        ...options
      })
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err)
    }
  }
  
  async saverToken(data){
    if(!!data) {
      await SecureStore.setItemAsync('data_user', JSON.stringify(data));
      this.getToken().then((data)=>{
        this.tokeAuth = data
      })
    }
  }
}