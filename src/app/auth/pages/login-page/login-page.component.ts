import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent implements OnInit
{
  public backgroundWebImage: string = 'https://i.postimg.cc/CxspH6QT/imgDC.png';
  public backgroundMobileImage: string = 'https://i.postimg.cc/rs8X0GqC/phone-Back.jpg';

  constructor(
    private authService: AuthService,
    private router: Router,
  ){};

  ngOnInit(): void {
    this.getResolutionImage();
  }

  @HostListener('window:resize', ['$event'])
  getResolutionImage = (): number => {
    let resolutionImage = window.innerWidth;
    return resolutionImage;
  };

  onLogin = ():void => {
    this.authService.login("bahamonsoto@gmail.com", "12345")
      .subscribe(response => {
        console.info('RES: ', response);
        this.router.navigate(['/']);
      });
  }
}
