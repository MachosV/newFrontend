import { Component, Input } from '@angular/core';
import QRCodeStyling from 'qr-code-styling';
import { ConfigurationService } from 'src/app/appConfiguration/config';

@Component({
  selector: 'app-qr-preview',
  templateUrl: './qr-preview.component.html',
  styleUrls: ['./qr-preview.component.css']
})
export class QrPreviewComponent {

  @Input() item = ""; 
  @Input() id ="";

  constructor(
    private configurationService: ConfigurationService,
    ){}

  qr: QRCodeStyling |null = null;

  ngOnInit(): void {
    setTimeout(()=>{
      var options = JSON.parse(atob(this.item))
      options.height = 200
      options.width = 200
      if (options.image.length > 0){
        options.image = this.configurationService.getBaseURL()+options.image
      }
      this.qr = new QRCodeStyling(options)
      var canvas = <HTMLElement> document.getElementById(this.id)
      canvas.innerHTML = ""
      this.qr.append(canvas)
    },0) //magic!
    
  }

  ngOnDestroy():void{
    this.id = ""
  }
}
