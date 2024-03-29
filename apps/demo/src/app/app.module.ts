import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './shared/header/header.component';
import { HeaderService } from './shared/header/header.service';
import { FooterComponent } from './shared/footer/footer.component';
import { FooterService } from './shared/footer/footer.service';
import { UsersService } from './users/users.service'
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertDialogComponent } from './shared/dialog/alert-dialog.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import { ConfirmDialogComponent } from './shared/dialog/confirm-dialog.component';


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, 
                 HeaderComponent, FooterComponent, UserListComponent, UserEditComponent, 
                 AlertDialogComponent, LoginComponent, ErrorComponent, ConfirmDialogComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, 
            BrowserAnimationsModule, MaterialModule,
            FlexLayoutModule, 
            AppRoutingModule],
  providers: [UsersService, HeaderService, FooterService,
              {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
             ],
  bootstrap: [AppComponent],
})
export class AppModule {}



