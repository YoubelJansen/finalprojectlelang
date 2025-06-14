import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-riwayat', // <-- DIUBAH
  templateUrl: './riwayat.page.html', // <-- DIUBAH
  styleUrls: ['./riwayat.page.scss'], // <-- DIUBAH
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class RiwayatPage implements OnInit { // <-- NAMA CLASS DIUBAH
  tenders: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getTenders().subscribe((res: any) => {
      this.tenders = res;
    });
  }
}