import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

// 1. Import AuthService di sini
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  // 2. Tambahkan AuthService di dalam array 'providers'
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService, // <-- DAFTARKAN SECARA EKSPLISIT DI SINI
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}