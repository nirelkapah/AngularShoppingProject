import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component'
import { CustomerComponent } from '../components/customer/customer.component'
import { AdminComponent } from '../components/admin/admin.component'
import { LoginComponent } from '../components/login/login.component'
import { RegisterComponent } from '../components/register/register.component'
import { OrderComponent } from '../components/order/order.component'
import { WelcomeComponent } from '../components/welcome/welcome.component'
import { SuccessfulOrderComponent } from '../components/successful-order/successful-order.component';

import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';






const routes: Routes = [
  {
    path: "home", component: HomeComponent, children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: "register", component: RegisterComponent },
      { path: "welcome", component: WelcomeComponent },

    ]
  },

  { path: "admin", canActivate: [AdminGuard], component: AdminComponent },
  { path: "customer",canActivate: [ClientGuard], component: CustomerComponent },
  { path: "order",canActivate: [ClientGuard] , component: OrderComponent },
  { path: "successfulOrder", component: SuccessfulOrderComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/home", pathMatch: "full" },


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes) // Importing the above routes
  ]
})
export class RoutingModule {

}
