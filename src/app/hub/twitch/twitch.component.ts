import { Component, OnInit } from '@angular/core';
import { TwitchService } from 'src/app/services/twitch.service';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements OnInit {
  id: string;
  tag: string;
  account: string;

  constructor(private twitchService: TwitchService) { }

  ngOnInit() {
    this.twitchService.id.subscribe((value) => this.id = value);
    this.twitchService.tag.subscribe((value) => this.tag = value);
    this.twitchService.account.subscribe((value) => this.account = value);
  }
}
