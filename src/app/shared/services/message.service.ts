import { Injectable } from '@angular/core';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // private messages: string[] = [];
  // protected messages: string[] = [];
  public messages: string[] = [];

  add(message: string) {
    this.logger.log(message);
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor(private readonly logger: Logger) {}
}
