import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { buildHTTPClient, HTTPClient } from 'src/app/globals/global-functions';

@Injectable({ providedIn: 'root' })
export class AuthService {

  httpClient: HTTPClient;
  constructor(private http: HttpClient) {
    this.httpClient = buildHTTPClient(this.http);
  }

  getUserByTwitch(twitchAccount: string) {
    return this.httpClient.get(`/chrome/getUserByTwitch/${twitchAccount}`);
  }
}
