import axios from 'axios';
import { of  } from 'rxjs';
import { first, retry } from 'rxjs/operators';
export class GeneralRequestService {
  static instance;
  httpService;

  constructor() {
    this.httpService = axios;
  }
  static getInstance() {
    if (!GeneralRequestService.instance) {
      GeneralRequestService.instance = new GeneralRequestService();
    }
    return GeneralRequestService.instance;
  }

  async post(endpoint, data) {
    return of(this.http.post(endpoint, data)).
      pipe(
      retry(1),
      first(),
      catchError((error) => console.error("Error petition",error) )
    );
  }

  async get(endpoint) {
    return of(this.http.get(endpoint)).
    pipe(
    retry(1),
    first(),
    catchError((error) => console.error("Error petition",error) )
  );
  }
}
