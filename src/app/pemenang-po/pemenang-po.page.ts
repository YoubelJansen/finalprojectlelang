// pemenang-po.page.ts
import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service'; // Pastikan path ini benar
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pemenang-po',
  templateUrl: './pemenang-po.page.html',
  styleUrls: ['./pemenang-po.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PemenangPoPage implements OnInit {
  results: any[] = [];

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.vendorService.getResults().subscribe(res => {
      this.results = res;
    });
  }
}
