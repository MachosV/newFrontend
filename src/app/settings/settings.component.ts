import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ConfigurationService } from '../appConfiguration/config';
import { ErrorHandlerService } from '../errorHandler/errorHandlerService';
import { MessagingService } from '../messages/messaging.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public oldPassword = ""
  public newPassword = ""
  public newPasswordConfirm = ""
  public passwordMatchOK = false
  public passwordLengthOK = false
  public passwordHasCapitalChar = false
  public passwordHasSpecialChar = false
  public okToShowSubmitButton = false
  
  constructor(
    private http: HttpClient,
    private messageService: MessagingService,
    private configService: ConfigurationService,
    private errorHandler: ErrorHandlerService
    ) { }


  changePassword():void{

    
    var params = {
      "oldPassword": this.oldPassword,
      "newPassword": this.newPassword,
      "newPasswordConfirm": this.newPasswordConfirm
    }

    this.http.post<any>(this.configService.getChangePasswordURL(),params).subscribe(data =>{
      this.messageService.addMessage("Password changed","success")
    },error =>{
      this.errorHandler.handleError(error)
      this.messageService.addMessage("There was an error changing your password","error")
    })
  }

  passwordFieldChanged(event:any):void{

    //check if passwords match
    if(this.newPassword == this.newPasswordConfirm && (this.newPassword.length > 0 && this.newPasswordConfirm.length > 0)){
      this.passwordMatchOK = true
    }else{
      this.passwordMatchOK = false
    }

    //check for length requirement
    if(this.newPassword.length <=7 || this.newPasswordConfirm.length <= 7){
      this.passwordLengthOK = false
    }else{
      this.passwordLengthOK = true
    }


    //check for capital character
    if(this.hasCapitalCharacter(this.newPassword) && this.hasCapitalCharacter(this.newPasswordConfirm)){
      this.passwordHasCapitalChar = true
    }else{
      this.passwordHasCapitalChar = false
    }

    //check for special character
    if(this.hasSpecialCharacter(this.newPassword) && this.hasSpecialCharacter(this.newPasswordConfirm)){
      this.passwordHasSpecialChar = true
    }else{
      this.passwordHasSpecialChar = false
    }

    //if all requirements are met, show submit button
    if(this.passwordHasCapitalChar && this.passwordHasSpecialChar && this.passwordLengthOK && this.passwordMatchOK && this.oldPassword.length > 7){
      this.okToShowSubmitButton = true
    }else{
      this.okToShowSubmitButton = false
    }


  }

  hasCapitalCharacter(str:string) {
    return /[A-Z]/.test(str);
  }

  hasSpecialCharacter(str:string) {
    return /[^a-zA-Z0-9]/.test(str);
  }

}
