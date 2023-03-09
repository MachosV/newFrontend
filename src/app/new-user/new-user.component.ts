import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from '../appConfiguration/config';
import { ErrorHandlerService } from '../errorHandler/errorHandlerService';
import { MessagingService } from '../messages/messaging.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  public invitationID = ""
  public newPassword = ""
  public newPasswordConfirm = ""
  public passwordMatchOK = false
  public passwordLengthOK = false
  public passwordHasCapitalChar = false
  public passwordHasSpecialChar = false
  public okToShowSubmitButton = false


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessagingService,
    private configService: ConfigurationService,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.invitationID = params['id'];
    });
  }

  setPassword():void{
    
    var params = {
      "invitationId": this.invitationID,
      "newPassword": this.newPassword,
      "newPasswordConfirm": this.newPasswordConfirm
    }

    this.http.post<any>(this.configService.getNewUserURL(),params).subscribe(data =>{
      this.messageService.addMessage("Password set","success")
      this.router.navigateByUrl("login")
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
    if(this.passwordHasCapitalChar && this.passwordHasSpecialChar && this.passwordLengthOK && this.passwordMatchOK){
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
