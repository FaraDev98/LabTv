import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  parseErrorStatus(error: any): number {
    let e: string = error.toString();

    if (e.includes("400")) {
      return 400;
    }

    if (e.includes("401")) {
      return 401;
    }

    if (e.includes("404")) {
      return 404;
    }

    return 200;
  }
}
