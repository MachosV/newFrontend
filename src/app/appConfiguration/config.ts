import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

    private baseURL = "http://68.183.6.57/"

    private loginURL = this.baseURL+""
    private redirectionServiceURL = this.baseURL+""
    private changePasswordURL = "api/auth/changePassword"
    private campaignURL = "api/campaign"
    private createCampaignURL = this.campaignURL+"create"
    private redirectionURL = this.baseURL+"rservice/"
    private newUserURL = this.baseURL+"newUser/"


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

  constructor() { }
}