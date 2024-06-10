import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TwitchService {
  id = new BehaviorSubject(null);
  tag = new BehaviorSubject(null);
  account = new BehaviorSubject(null);
}
