import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.page.html',
  styleUrls: ['./vendor.page.scss'],
  standalone: false,
})
export class VendorPage {
  vendors: any[] = [];

  constructor() {
    const data = localStorage.getItem('vendors');
    this.vendors = data ? data.split('|').map(item => ({ nama: item })) : [];
  }
}
