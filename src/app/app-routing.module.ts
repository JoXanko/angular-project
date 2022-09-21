import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { MyPetsComponent } from './components/my-pets/my-pets.component';

const routes: Routes = [
  { path: 'mainPage', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'myPets', component: MyPetsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}

export const routingComponents = [MainPageComponent, MyPetsComponent]; //sve path treba ovde
