import { Injectable } from '@angular/core';
import { NzMessageService, NzMessageDataOptions } from 'ng-zorro-antd';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private message: NzMessageService) { }

  openErrorModal (prompt: string, options?: NzMessageDataOptions) {
    this.message.error(prompt, options);
  }
}
