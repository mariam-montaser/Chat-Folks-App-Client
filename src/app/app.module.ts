import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';

import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    NotFoundComponent,
    ServerErrorComponent,
    TestErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
