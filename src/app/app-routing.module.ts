import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {
  isAuthenticatedGuard,
  isNotAuthenticateGuard,
} from "./auth/guards/auth.guard";
import { Error404PageComponent } from "./shared/pages/error404-page/error404-page.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [isNotAuthenticateGuard],
  },
  {
    path: "heroes",
    loadChildren: () => import("./heroes/heroes.module").then((m) => m.HeroesModule),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: "404",
    component: Error404PageComponent,
  },
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
