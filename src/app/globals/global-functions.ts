import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './global-variables';

export type HTTPClient = {
  get: (url: string) => Observable<unknown>,
  put: (url: string, data?: any) => Observable<unknown>,
  post: (url: string, data?: any) => Observable<unknown>,
  delete: (url: string) =>  Observable<unknown>
};

export function buildHTTPClient(http: HttpClient): HTTPClient {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const options = { headers };

  return {
    get: (url) => http.get(`${baseUrl}${url}`, options),
    put: (url, data) => http.put(`${baseUrl}${url}`, data, options),
    post: (url, data) => http.post(`${baseUrl}${url}`, data, options),
    delete: (url) => http.delete(`${baseUrl}${url}`, options)
  };
}

export function isAuthExpired(error: any) {
  if (!error) {
    return false;
  }
  const errorMessage = error.error?.msg || error.error || error;
  return errorMessage.includes('Token expired') || errorMessage.includes('Token invalid');
}
