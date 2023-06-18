import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponentComponent } from './home-component/home-component.component';
import { Page1Component } from './page1/page1.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    Page1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
