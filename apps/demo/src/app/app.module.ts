import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HeaderComponent, FooterComponent, UserListComponent],
  imports: [BrowserModule, HttpClientModule, 
            BrowserAnimationsModule, MaterialModule,
            FlexLayoutModule],
  providers: [UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}