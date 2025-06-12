// src/app/pages/reset-password/reset-password.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController, IonicModule } from '@ionic/angular'; // <-- Tambahkan IonicModule
import { CommonModule } from '@angular/common'; // <-- Tambahkan CommonModule
import { FormsModule } from '@angular/forms'; // <-- Tambahkan FormsModule

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true, // <-- Pastikan ini ada
  imports: [
    IonicModule, // <-- Tambahkan ini
    CommonModule, // <-- Tambahkan ini
    FormsModule,  // <-- Tambahkan ini (PENTING untuk ngModel)
  ],
})
export class ResetPasswordPage implements OnInit {
  // ... (sisa kode Anda sama persis)
}