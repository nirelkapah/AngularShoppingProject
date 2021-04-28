import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { CartComponent } from '../components/cart/cart.component';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DialogWindowComponent } from '../components/dialog-window/dialog-windows';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminComponent } from '../components/admin/admin.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { UserService } from '../services/user-service';
import { CartsService } from '../services/carts-service';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductsService } from '../services/products-service';
import { ReservationsService } from '../services/reservations-service';
import { ProductPipeByName } from '../pipes/ProductPipeByName';
import { NewToOldPipe } from '../pipes/NewToOldPipe';
import { HighlightSearch } from '../pipes/HighlightSearch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidateEqualModule } from 'ng-validate-equal';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderComponent } from '../components/order/order.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { SuccessfulOrderComponent } from '../components/successful-order/successful-order.component';
import { ProductManagerComponent } from '../components/product-manager/product-manager.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';

















@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    CartComponent,
    HomeComponent,
    FooterComponent,
    AdminComponent,
    ProductPipeByName,
    NewToOldPipe,
    HighlightSearch,
    CustomerComponent,
    RegisterComponent,
    LoginComponent,
    DialogWindowComponent,
    OrderComponent,
    SuccessfulOrderComponent,
    ProductManagerComponent,
    WelcomeComponent],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    ValidateEqualModule,
    MatSelectModule,
    MatSidenavModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
  ],

  providers: [
    UserService,
    ProductsService,
    ReservationsService,
    CartsService,
    AuthenticationInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }

  ],

  bootstrap: [LayoutComponent]
})
export class AppModule { }
