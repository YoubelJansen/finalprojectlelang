import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

// 1. Import AuthService di sini
import { AuthService } from './auth.service';

// --- TAMBAHKAN IMPORT INI ---
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  // 2. Tambahkan AuthService dan LocationStrategy di dalam array 'providers'
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // --- TAMBAHKAN BARIS INI ---
    // Memberitahu Angular untuk menggunakan Hash (#) sebagai strategi utama routing.
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthService, // <-- DAFTARKAN SECARA EKSPLISIT DI SINI
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
