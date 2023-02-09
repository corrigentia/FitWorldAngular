import { Injectable } from '@angular/core';

@Injectable()
/*
  {
  providedIn: 'root',
}
  */
export class Logger {
  constructor() {}

  log(msg: any, ...optionalParams: any[]) {
    console.log(msg, ...optionalParams);
  }
  error(msg: any, ...optionalParams: any[]) {
    console.error(msg, ...optionalParams);
  }
  warn(msg: any, ...optionalParams: any[]) {
    console.warn(msg, ...optionalParams);
  }
}
