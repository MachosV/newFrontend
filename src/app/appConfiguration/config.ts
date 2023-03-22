import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

    //private baseURL = "http://68.183.6.57/"
    //private baseURL = "http://qrexp.io/"
    //private baseURL = "http://qrexp.io:8000/"
    private baseURL = "http://localhost:8000/"

    private loginURL = this.baseURL+"api/auth"
    private redirectionServiceURL = this.baseURL+""
    private changePasswordURL = this.baseURL+"api/auth/changePassword"
    private campaignURL = this.baseURL+"api/campaign"
    private createCampaignURL = this.campaignURL+"/create"
    private redirectionURL = this.baseURL+"rservice/"
    private newUserURL = this.baseURL+"api/user/create"
    private resetPasswordURL = this.baseURL+"api/auth/resetPassword"
    private requestResetPasswordIdURL = this.baseURL+"api/auth/requestResetPasswordId"


    getBaseURL():string{
        return this.baseURL
    }

    getLoginURL():string{
        return this.loginURL
    }

    getRedirectionServiceURL(): string{
        return this.redirectionServiceURL
    }

    getChangePasswordURL(): string{
        return this.changePasswordURL
    }

    getCampaignsURL():string{
        return this.campaignURL
    }

    getCreateCampaignURL():string{
        return this.createCampaignURL
    }

    getNewUserURL():string{
        return this.newUserURL
    }

    getRedirectionURL():string{
        return this.redirectionURL
    }

    getResetPasswordURL():string {
        return this.resetPasswordURL
    }

    getRequestResetPasswordURL():string{
        return this.requestResetPasswordIdURL
    }

  constructor() { }
}