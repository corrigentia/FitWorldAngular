import { Component } from '@angular/core';
import { MessageService } from '../shared/services/message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    standalone: false
})
export class MessagesComponent {
  constructor(protected readonly messageService: MessageService) {}
}
