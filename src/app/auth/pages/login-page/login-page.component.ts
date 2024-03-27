import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent implements OnInit
{
  public backgroundWebImage: string = 'https://i.postimg.cc/CxspH6QT/imgDC.png';
  public backgroundMobileImage: string = 'https://i.postimg.cc/rs8X0GqC/phone-Back.jpg';

  ngOnInit(): void {
    this.getResolutionImage();
  }

  @HostListener('window:resize', ['$event'])
  getResolutionImage = (): number => {
    let resolutionImage = window.innerWidth;
    return resolutionImage;
  };
}
