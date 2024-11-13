import { ActivatedRoute, Router } from "@angular/router";
import { Component, HostListener, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

import { filter, Observable, of, switchMap, tap } from "rxjs";

import { Hero, Publisher } from "../../interfaces/hero.interface";

import { HeroesServices } from "../../services/heroes.service";
import { ConfirmDialogComponent } from "../../helpers/dialogs/confirm-dialog/confirm-dialog.component";

import Swal from 'sweetalert2';

@Component({
  selector: "app-new-hero-page",
  templateUrl: "./new-hero-page.component.html",
  styleUrls: ["./new-hero-page.component.sass"],
})
export class NewHeroPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl<string>(""),
    superhero: new FormControl<string>(""),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(""),
    first_appearance: new FormControl<string>(""),
    characters: new FormControl<string>(""),
    alt_img: new FormControl<string>(""),
  });

  public publishers = [
    { id: "DC Comics", desc: "DC - Comics" },
    { id: "Marvel Comics", desc: "Marvel - Comics" },
  ];

  public screenWidth = window.innerWidth;
  // public marginBottomStyle = { 'margin-top': '-2%', 'margin-bottom': '-2%' };

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroesServices,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes("edit")) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl("/");

        this.heroForm.reset(hero);
        return;
      });
  }

  @HostListener("window:resize", ["$event"])
  windowResize = (): void => {
    this.screenWidth = window.innerWidth;
    this.setMarginBottomStyle();
  };

  setMarginBottomStyle(): void {
    const marginTopValue = "-1.5%";
    const marginBottomValue = "2.5%";
    // this.marginBottomStyle = { 'margin-top': marginTopValue, 'margin-bottom': marginBottomValue };
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit = () => {
    console.info({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
    });

    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((hero) => {
        this.router.navigate(["/heroes/edit", hero.id]);
        this.showSnackBar(`${hero.superhero} actualizado!`);
      });

      return;
    }

    this.heroService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate(["/heroes/edit", hero.id]);
      this.showSnackBar(`${hero.superhero} creado!`);
    });
  };

  onDeleteHero = (
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void => {
    if (!this.currentHero.id) throw Error("El heroe es requerido");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "¿Esta seguro de eliminar el héroe?",
        text: "Este proceso no es reversible, esta a punto de eliminar a ",
        continueButton: "deleteAction",
        cancelButton: "Cancelar",
        optionalData: this.currentHero,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap((response: boolean) => response ? this.heroService.deleteHeroById(this.currentHero.id) : of(false) ),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        Swal.fire({
          confirmButtonText: 'Cerrar',
          icon: 'success',
          text: 'Se ha eliminado el hèroe correctamente',
          title: 'Héroe eliminado!',
        }).then(result => {
          if( result.isConfirmed ){
            this.router.navigate(['/heroes']);
          }
        });
      })

    // REMPLAZADO POR LO QUE TENEMOS ARRIBA
    // dialogRef.afterClosed().subscribe(result => {
    //   if( !result ) return;

    //   this.heroService.deleteHeroById( this.currentHero.id )
    //     .subscribe(response => {
    //       if(response){
    //         Swal.fire({
    //           confirmButtonText: 'Cerrar',
    //           icon: 'success',
    //           text: 'Se ha eliminado el hèroe correctamente',
    //           title: 'Héroe eliminado!',
    //         }).then(result => {
    //           if( result.isConfirmed ){
    //             this.router.navigate(['/heroes']);
    //           }
    //         });
    //       }
    //     })
    // });


  };

  showSnackBar = (message: string): void => {
    this.snackbar.open(message, "Mi mensaje", {
      duration: 5000,
    });
  };
}
