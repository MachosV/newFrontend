import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

    private baseURL = "http://localhost:8000/"

    private loginURL = this.baseURL+""
    private redirectionServiceURL = this.baseURL+""
    private changePasswordURL = "api/auth/changePassword"


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

  constructor() { }
}