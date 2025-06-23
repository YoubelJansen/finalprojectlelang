import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service'; // Sesuaikan path
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-pilih-tender',
  templateUrl: './pilih-tender.page.html',
  styleUrls: ['./pilih-tender.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule] // Tambahkan RouterModule
})
export class PilihTenderPage implements OnInit {
  
  public activeTenders: any[] = [];
  public isLoading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadActiveTenders();
  }

  ionViewWillEnter() {
    this.loadActiveTenders();
  }

  loadActiveTenders() {
    this.isLoading = true;
    this.adminService.getTendersForSelection().subscribe({
      next: (res: any[]) => {
        // Filter di frontend untuk menampilkan tender yang relevan
          this.activeTenders = res.filter(
          tender => tender.status === 'Berlangsung' || tender.status === 'Evaluasi' || tender.status === 'Baru'
        );
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
