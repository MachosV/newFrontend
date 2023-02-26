import { Injectable } from '@angular/core';
import { GatekeeperService } from '../auth/gatekeeper.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private gatekeeper:GatekeeperService
  ) { }

  handleError(error:any):void{
    if (error.status==401){
        this.gatekeeper.logout()
    }
  }
}