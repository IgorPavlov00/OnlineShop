import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClothingListComponent} from "./app/clothing-list/clothing-list.component";
import {ClothingDetailComponent} from "./app/clothing-detail/clothing-detail.component";
import {SearchComponent} from "./app/search/search.component";
import {CartComponent} from "./app/cart/cart.component";
import {LoginComponent} from "./app/login/login.component";
import {ProfileComponent} from "./app/profile/profile.component";
import {EditComponent} from "./app/edit/edit.component";


const routes: Routes = [
  { path: '', component: ClothingListComponent },
  { path: 'clothing/:id', component: ClothingDetailComponent },
  { path: 'search', component: SearchComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
