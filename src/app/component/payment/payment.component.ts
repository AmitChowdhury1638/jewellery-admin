import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import * as data from 'src/app/payment.json';
import { AddPaymentComponent } from '../add-payment/add-payment.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  editEnabled = false;
  data: any = (data as any).default;

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onRowEditInit(customer: any, index: number) {
    console.log(index);
    this.editEnabled = true;
    console.log('Row edit initialized');
  }

  onRowEditSave(customer: any, index: number) {
    console.log(index);
    this.editEnabled = false;
    console.log('Row edit saved');
  }

  onRowEditCancel(customer: any, index: number) {
    console.log(index);
    this.editEnabled = false;
    console.log('Row edit cancelled');
  }

  show() {
    const ref = this.dialogService.open(AddPaymentComponent, {
        header: 'Add Payment Method',
        width: '350px'
    });
  }
}