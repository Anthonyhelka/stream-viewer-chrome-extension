import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTPClient, buildHTTPClient } from 'src/app/globals/global-functions';
import { baseSiteUrl } from 'src/app/globals/global-variables';

@Injectable({ providedIn: 'root' })
export class SocialsService {
  httpClient: HTTPClient;
  constructor(private http: HttpClient) {
    this.httpClient = buildHTTPClient(this.http);
  }

  // Twitch
  hasLinkedTwitch(userId: string) {
    return this.httpClient.get(`/twitchLinked/${userId}`);
  }

  isSubscribedOnTwitch(userId: string, hostId: string) {
    return this.httpClient.get(`/isSubscribed/${userId}/${hostId}`);
  }

  getTwitchInfo(code: string, userId: string) {
    return this.httpClient.get(`/verifyTwitch/${code}/${userId}`);
  }

  getTwitchExtensionConfigured(userId: string) {
    return this.httpClient.get(`/isExtensionConfigured/${userId}`);
  }

  getTrovoInfo(code: string, userId: string) {
    return this.httpClient.get(`/verifyTrovo/${code}/${userId}`);
  }

  // Youtube
  getYouTubeUsername(code: string, userId: string): any {
    return this.httpClient.get(`/verifyYoutube/${code}/auth0Id/${userId}`);
  }

  // Discord
  getDiscordUsername(code: string, userId: string): any {
    return this.httpClient.get(`/verifyDiscord/${code}/${userId}`);
  }
  setDiscordBot(code: string, userId: string): any {
    return this.httpClient.put(`/discord/bot/${code}/${userId}`);
  }

  // Streamlabs
  putStreamlabsAccessToken(code: string, userId: string): any {
    return this.httpClient.post(`/streamlabs/${userId}/${code}`);
  }

  // Paypal
  getPayPalAccessToken(code: string, userId: string): any {
    return this.httpClient.get(`/paypal/getAccessToken/${userId}/${code}`);
  }

  // Twitter
  getTwitterUserCredentials(credentials, userId) {
    return this.httpClient.post(`/twitter/getUserCredentials/${userId}`, credentials);
  }

  getTwitterOAuthToken() {
    return this.httpClient.get(`/twitter/getOauthToken`);
  }

  verifyWithTwitter() {
    this.getTwitterOAuthToken().subscribe(
        resBody => {
          const accessToken = (<any> resBody).accessToken;
          window.location.href = 'https://api.twitter.com/oauth/authorize?oauth_token=' + accessToken;
        }
    );
  }
}

// OAuth Links
export function verifyWithFacebook(state = {}, go = true) {
  const url = 'https://www.facebook.com/v8.0/dialog/oauth?response_type=code' +
  '&client_id=285493932218721&scope=email' +
  '&redirect_uri=' + baseSiteUrl + '/facebook' + `&state=${JSON.stringify(state)}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}

export function verifyWithTwitch(state = {}, go = true) {
  const url = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=code' +
  '&client_id=fmdlexdhqos4gfkun1ooe5wjpjlkec' +
  '&redirect_uri=' + baseSiteUrl + '/twitch' +
  '&scope=openid+user_subscriptions+user:read:email&force_verify=true' +
  `&claims=${JSON.stringify({id_token: {email: null, preferred_username: null}, userinfo: {picture: null}})}` +
  `&state=${JSON.stringify(state)}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}
export function verifyWithYouTube(state = {}, go = true) {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly' +
    '&access_type=offline' +
    '&include_granted_scopes=true' +
    '&redirect_uri=' + baseSiteUrl + '/youtube' +
    '&response_type=code&client_id=1055779676792-mru9qaguv5b2s8seoh1vm2rcds58ck5h.apps.googleusercontent.com\n' +
    `&state=${JSON.stringify(state)}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}
export function verifyWithGoogle(state = {}, go = true) {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    'scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email' +
    '&access_type=offline' +
    '&include_granted_scopes=true' +
    '&redirect_uri=' + baseSiteUrl + '/youtube' +
    '&response_type=code&client_id=1055779676792-mru9qaguv5b2s8seoh1vm2rcds58ck5h.apps.googleusercontent.com\n' +
    `&state=${JSON.stringify(state)}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}
export function verifyWithDiscord(state = {}, go = true) {
  const url = 'https://discordapp.com/oauth2/authorize?' +
    'client_id=453396332061655049&scope=identify%20email' + '&response_type=code' +
    '&redirect_uri=' + baseSiteUrl + '/discord' + `&state=${JSON.stringify(state)}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}
export function discordBot(state = {}, go = true) {
  const url = 'https://discordapp.com/oauth2/authorize?' +
  'client_id=453396332061655049&scope=identify%20email%20webhook.incoming%20applications.commands%20bot&permissions=0' +
  '&response_type=code&redirect_uri=' + baseSiteUrl + '/discord' + `&state=${JSON.stringify({ type: 'bot', ...state })}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}
export function verifyWithStreamlabs() {
  window.location.href = 'https://www.streamlabs.com/api/v1.0/authorize?' +
    'response_type=code&client_id=DFNxJqDARw59TbvwXUUFXt1uPcrelhhAqGp9fCya' +
    '&redirect_uri=' + baseSiteUrl + '/streamlabs' + '&scope=alerts.create';
}

export function verifyWithTrovo(state = {}, go = true) {
  const url = 'https://open.trovo.live/page/login.html?' +
  'client_id=3431972b0f16caffa672ec662bcd4480&scope=user_details_self+channel_details_self' +
  '&response_type=code&redirect_uri=' + baseSiteUrl + '/trovo' + `&state=${JSON.stringify(state)}`;

  if (go) {
    window.location.href = url;
  }

  return url;
}
