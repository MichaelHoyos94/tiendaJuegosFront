import { Component, Input } from '@angular/core';
import { Alert } from 'src/app/model/alert';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() alert!: Alert | null;

  public hide() {
    this.alert = null;
  }
}
