import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../appConfiguration/config';
import { ErrorHandlerService } from '../errorHandler/errorHandlerService';
import { MessagingService } from '../messages/messaging.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private messageService: MessagingService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ){}

  public username = ""

  requestResetId():void{

    var params = {
      "username": this.username,
    }

    console.log(this.username)
    this.http.post<any>(this.configService.getRequestResetPasswordURL(),params).subscribe(data =>{
      this.router.navigateByUrl("login")
      this.messageService.addMessage("An email has been sent to your address","success")
    },error =>{
      this.errorHandler.handleError(error)
      this.messageService.addMessage("There was an error reseting your password, try again later","error")
    })
  }

}
