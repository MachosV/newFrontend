import { Component } from '@angular/core';
import { QroptionsService } from '../qroptions.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MD5 } from 'crypto-js';
import QRCodeStyling from 'qr-code-styling';
import { HttpClient } from '@angular/common/http';
import { MessagingService } from 'src/app/messages/messaging.service';
import { ErrorHandlerService } from 'src/app/errorHandler/errorHandlerService';
import { ConfigurationService } from 'src/app/appConfiguration/config';

@Component({
  selector: 'app-qreditor',
  templateUrl: './qreditor.component.html',
  styleUrls: ['./qreditor.component.css']
})



export class QreditorComponent {
  constructor(
    private qrOptionService: QroptionsService,
    private messageService: MessagingService,
    private http: HttpClient,  
    private errorHandler: ErrorHandlerService,
    private configurationService: ConfigurationService
  ) {}

  redirectionServiceURL: string = this.configurationService.getRedirectionURL()
  private fd = new FormData()
  qrObject: any = {
    qrUUID:"",
    qrName:"",
    tempLink:"",
    qrDescription:"",
    links:[],
    isSavedOnBackend:false,
    qrAnalytics:"",
    size:200,
    filetype:"jpeg",
    options:{
      image:"",
      backgroundOptions:{
        color:"#ffffff",
      },
      dotsOptions:{
        color:"#000000",
        type:"dots",
      },
      cornersSquareOptions:{
        type:"",
      },
      cornersDotOptions:{
        type:""
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5
    }
    },
  }

  
  qrDotColorToggle:boolean = true;
  qrDotColor: string = "000000"
  qrDotColorGradient: any = {
    type:"linear",
    rotation:0,
    colorStops:[
      {offset:0,color:""},
      {offset:1,color:""}
    ]
  }
  qrBackgroundColorToggle:boolean = true;
  qrBackgroundColor: string = "#ffffff"
  qrBackgroundColorGradient: any = {
    type:"linear",
    rotation:0,
    colorStops:[
      {offset:0,color:"#ffffff"},
      {offset:1,color:"#ffffff"}
    ]
  }



  private qrChangeSubject = new Subject();
  private qrSingleDotColorChange = new Subject();
  private qrGradientDotColorChange = new Subject();
  private qrSingleBackgroundColorChange = new Subject();
  private qrGradientBackgroundColorChange = new Subject();

  ngOnInit(): void {

    this.qrChangeSubject.pipe(debounceTime(250))
    .subscribe(_ => {
      this.qrOptionService.setQrObject(this.qrObject);
    })

    this.qrSingleDotColorChange.pipe(debounceTime(250))
    .subscribe(_ => {
      this.qrObject.options.dotsOptions.color = this.qrDotColor
      delete this.qrObject.options.dotsOptions.gradient
      this.onQrChange()
    })

    this.qrGradientDotColorChange.pipe(debounceTime(250))
    .subscribe(_ => {
      this.qrObject.options.dotsOptions.gradient = this.qrDotColorGradient
      delete this.qrObject.options.dotsOptions.color
      this.onQrChange()
    })

    this.qrSingleBackgroundColorChange.pipe(debounceTime(250))
    .subscribe(_ => {
      this.qrObject.options.backgroundOptions.color = this.qrBackgroundColor
      delete this.qrObject.options.backgroundOptions.gradient
      this.onQrChange()
    })

    this.qrGradientBackgroundColorChange.pipe(debounceTime(250))
    .subscribe(_ => {
      this.qrObject.options.backgroundOptions.gradient = this.qrBackgroundColorGradient
      delete this.qrObject.options.backgroundOptions.color
      this.onQrChange()
    })

    this.qrObject.qrUUID = Math.random().toString(36).slice(2, 7);
  }

  onRepresentationLinkChange(){
    if(this.qrObject.links[0].length > 0){
      this.calculateQRData()
    }else{
      this.qrObject.options.data=""
      this.qrObject.links[0]=""
    }
  
    this.onQrChange()
  }

  addLink(): void{
    if (this.qrObject.tempLink.length < 1){
      return
    }
    this.qrObject.links.push(this.qrObject.tempLink)
    this.qrObject.tempLink = "";
    this.qrChangeSubject.next(this.qrObject)
    this.calculateQRData() 
  }

  onQrChange(){
    this.qrChangeSubject.next(this.qrObject)
    this.qrObject.data = ""
    this.qrObject.isSavedOnBackend = false
  }

  onSingleDotColorChange(){
    this.qrSingleDotColorChange.next("")
  }

  onGradientDotColorChange(){
    this.qrGradientDotColorChange.next("")
  }

  onSingleBackgroundColorChange(){
    this.qrSingleBackgroundColorChange.next("")
  }

  onGradientBackgroundColorChange(){
    this.qrGradientBackgroundColorChange.next("")
  }

  onQRImageUploaded(event: any){
    if (!event.target.files[0]){
      this.fd.delete('image')
      console.log("deleted image")
      this.qrObject.options.image = ""
    }else{
      const file = event.target.files[0];
      this.fd.append('image', file, file.name);
  
      this.qrObject.options.image = "event.target.files[0].name"
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.qrObject.options.image = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.onQrChange()
  }

  downloadQR(){
    var qrCode = new QRCodeStyling(this.qrOptionService.qrObject.options) 
    qrCode.download({ name: this.qrObject.qrName.length > 0?this.qrObject.qrName:"qr", extension: this.qrObject.filetype });
  }

  createQR(){
    var imageBacklink:any
    if (this.fd.get('image') ){
      this.http.post('api/images', this.fd).subscribe(res => {
        var data:any = res
        imageBacklink = data['file_url'];
        this.qrObject.options.image = imageBacklink
        this.qrOptionService.saveQR().subscribe(
          data => {
            this.qrObject.isSavedOnBackend = true
            this.messageService.addMessage("QR Saved!","success")
          },
          error => {
            this.qrObject.isSavedOnBackend = false
            console.log(error)
            this.messageService.addMessage(error,"error")
          }
        )
      })
    }else{
      this.qrOptionService.saveQR().subscribe(
        data => {
          this.qrObject.isSavedOnBackend = true
          this.messageService.addMessage("QR Saved!","success")
        },
        error => {
          this.qrObject.isSavedOnBackend = false
          this.errorHandler.handleError(error)
          this.messageService.addMessage(error,"error")
        }
      )
    }
  }

  showSingleURLForm(){
    this.onQrChange()
    this.qrObject.options.data = ""
  }

  showVCardForm(){
    this.onQrChange()
    let vcardData = `BEGIN:VCARD

VERSION:3.0
    
N:VALKANIOTIS;TILEMACHOS;;;
    
TEL;CELL:0099912123456 
EMAIL;WORK:Rey@company.com
    
END:VCARD`
    this.qrObject.options.data = vcardData
  }

  calculateQRData(){
    var tempString=""
    this.qrObject.links.forEach( (link:string) => {
      tempString+=link
    });
    this.qrObject.options.data = this.redirectionServiceURL+this.qrObject.qrUUID+MD5(tempString).toString().slice(-4);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  deleteQrLink(index: number):void{
    this.qrObject.links.splice(index,1)
    if (this.qrObject.links.length == 0){
      this.qrObject.options.data=""
      this.onQrChange()
      return
    }
    this.calculateQRData()
    this.onQrChange()
  }

  /*showQRLinks(): void{
    this.showQRLinksFlag = true;
  }*/

  onDotColorToggleChange(value :boolean){
    if(value){
      this.onSingleDotColorChange()
    }
    else{
      this.onGradientDotColorChange()
    }
    this.qrDotColorToggle = value
  }

  onBackgroundColorToggleChange(value: boolean){
    if(value){
      this.onSingleBackgroundColorChange()
    }
    else{
      this.onGradientBackgroundColorChange()
    }
    this.qrBackgroundColorToggle = value
  }

}
