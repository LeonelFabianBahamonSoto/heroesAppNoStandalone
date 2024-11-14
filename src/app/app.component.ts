import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  title = "heroesAppNoStandalone";

  // constructor( private authService: AuthService ) {}

  // ngOnInit(): void {
  //   this.authService.checkAuthentication()
  //     .subscribe(() => { console.info("AUTH FINISHED")})
  // };
}
