import axios from 'axios';
import { HttpCommonService } from './http-common.service';
import * as SecureStore from 'expo-secure-store';
import { endPoints } from '@shared/dictionaries/end-points';

export class GeneralRequestService {
  static instance;
  httpService;

  constructor() {
    this.httpService = axios;
    this.httpCommonService = new HttpCommonService();
    this.getToken().then((data) => {
      this.tokeAuth = data;
    });
  }
  static getInstance() {
    if (!GeneralRequestService.instance) {
      GeneralRequestService.instance = new GeneralRequestService();
    }
    return GeneralRequestService.instance;
  }

  async getToken() {
    try {
      const data = await SecureStore.getItemAsync('data_user');
      const dataParse = JSON.parse(data);
      return dataParse?.api_key;
    } catch (e) {
      console.error(e);
    }
  }

  async post(endpoint, data, saveToken) {
    try {
      const response = await this.httpService.post(endpoint, data, {
        headers: { 'ttrak-key': this.tokeAuth || '' },
      });
      if (saveToken) {
        this.saverToken(response.data);
      }
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err);
      if (err.response.status === 403 && err.response.data.name == 'Forbidden') {
        return {
          restricted: true,
        };
      }
    }
  }

  async get(endpoint, options = {}) {
    try {
      const response = await this.httpService.get(endpoint, {
        headers: { 'ttrak-key': this.tokeAuth || '' },
        ...options,
      });
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err);
      if (err.response.status === 403 && err.response.data.name == 'Forbidden') {
        return {
          restricted: true,
        };
      }
    }
  }

  async postWithHeaders(endpoint, data, saveToken) {
    try {
      const response = await this.httpService.post(endpoint, data, {
        headers: { 'ttrak-key': this.tokeAuth || '' },
      });
      if (saveToken) {
        this.saverToken({
          ...response.data,
          company: response.headers['tradetrak-company'],
        });
      }

      return {
        body: response.data,
        headers: response.headers,
      };
    } catch (err) {
      console.log('=>err', err);
      this.httpCommonService.handleError(err);
      if (err.response.status === 403 && err.response.data.name == 'Forbidden') {
        return {
          body: { restricted: true },
          headers: err.response.headers,
        };
      }
    }
  }

  async getWithHeaders(endpoint, options = {}, params = {}) {
    try {
      const response = await this.httpService.get(endpoint, {
        params,
        headers: { 'ttrak-key': this.tokeAuth || '' },
        ...options,
      });

      return {
        body: response.data,
        headers: response.headers,
      };
    } catch (err) {
      this.httpCommonService.handleError(err);
      if (err.response.status === 403 && err.response.data.name == 'Forbidden') {
        return {
          body: { restricted: true },
          headers: err.response.headers,
        };
      }
    }
  }

  async put(endpoint, data, options = {}) {
    try {
      const response = await this.httpService.put(endpoint, data, {
        headers: { 'ttrak-key': this.tokeAuth || '' },
        ...options,
      });
      return response.data;
    } catch (err) {
      this.httpCommonService.handleError(err);
    }
  }

  async auth(data) {
    try {
      const response = await this.httpService.post(endPoints.auth, data);
      this.saverToken({
        ...response.data,
        company: response.headers['tradetrak-company'],
      });

      return {
        body: response.data,
        headers: response.headers,
      };
    } catch (err) {
      this.httpCommonService.handleError(err);
      if (err.response.status === 403 && err.response.data.name == 'Forbidden') {
        return {
          body: { restricted: true },
          headers: err.response.headers,
        };
      }
    }
  }

  async saverToken(data) {
    if (!!data) {
      this.tokeAuth = data?.api_key;
      await SecureStore.setItemAsync('data_user', JSON.stringify(data));
    }
  }
}
