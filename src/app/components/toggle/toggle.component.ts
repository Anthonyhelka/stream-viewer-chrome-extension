import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  @Input() active = false;
  @Input() simple = false;
  @Output() toggle = new EventEmitter();

  onToggle(event: any) {
    event.preventDefault();
    this.toggle.emit(!this.active);
  }
}
