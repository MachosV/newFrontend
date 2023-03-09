import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Campaign, CampaignPage } from './campaignInterface';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessagingService } from '../messages/messaging.service';
import { ConfigurationService } from '../appConfiguration/config';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaignURL = "api/campaign"
  private createCampaignURL = this.campaignURL+"/create"
  private representationLink = "";

  tempLinks: string = ""

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessagingService,
    private configService: ConfigurationService,
    ) { }

  postCampaign(campaign: Campaign){
    this.http.post<Campaign>(this.configService.getCreateCampaignURL(),campaign)
    .subscribe(
      _=>_,
      error => console.log("An error occured",error))
  }

  updateCampaign(campaign: Campaign, links: string[]){
    var object = {
      "name":campaign.name,
      "description":campaign.description,
      "links": links
    }
    this.http.put<Campaign>(this.configService.getCampaignsURL()+"/"+campaign.id+"/update",object)
    .subscribe(
      _=>_,
      error => console.log("An error occured",error))
  }

  deleteCampaign(campaign: Campaign): void{
    this.http.delete<Campaign>(this.configService.getCampaignsURL()+"/"+campaign.id)
    .subscribe(
      _=>{this.messageService.addMessage("QR Code Deleted","success")},
      error => console.log("An error occured",error))
  }
  
  getCampaignList(page:string, search:string) :Observable<CampaignPage>{

    let params = new HttpParams();
    var tempCampaignURL = this.configService.getCampaignsURL()
    if(page){
      tempCampaignURL = tempCampaignURL+page.split("/campaign")[1]
    }
    if(search){
      params = params.append('s', search);
    }
    return this.http.get<CampaignPage>(tempCampaignURL,{params:params})
  }

  getCampaign(id: string): Observable<Campaign> {
    return this.http.get<Campaign>(this.configService.getCampaignsURL()+"/"+id)
  }

  setRepresentationLink(representationLink: string){
    this.representationLink = representationLink
  }
  
  getRepresentationLink(): string{
    return this.representationLink
  }

}
