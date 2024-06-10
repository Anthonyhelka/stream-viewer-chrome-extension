import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitchService } from '../services/twitch.service';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
  text = '';

  constructor(private ngZone: NgZone, private twitchService: TwitchService, private router: Router) { }

  ngOnInit() {
    chrome.storage.sync.get((result) => {
      if (result.twitchId) {
        this.ngZone.run(() => {
          this.twitchService.id.next(result.twitchId);
          this.twitchService.tag.next(result.twitchTag);
          this.twitchService.account.next(result.twitchAccount);
          this.router.navigate(['/twitch']);
        });
      } else {
        this.ngZone.run(() => this.text = 'Welcome to the hub');
      }
    });
  }
}
