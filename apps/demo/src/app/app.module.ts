import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UsersService } from './users/users.service'
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertDialogComponent } from './shared/dialog/alert-dialog.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HeaderComponent, FooterComponent, UserListComponent, UserEditComponent, AlertDialogComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, 
            BrowserAnimationsModule, MaterialModule,
            FlexLayoutModule,
            AppRoutingModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}



