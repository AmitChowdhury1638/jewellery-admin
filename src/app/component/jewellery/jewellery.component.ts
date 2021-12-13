import { Component, OnInit } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import * as data from 'src/app/category.json';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JewelleryService } from 'src/app/service/jewellery/jewellery.service';

@Component({
  selector: 'app-jewellery',
  templateUrl: './jewellery.component.html',
  styleUrls: ['./jewellery.component.css'],
  animations: [
    trigger('animation', [
        state('visible', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('void => *', [
            style({transform: 'translateX(50%)', opacity: 0}),
            animate('300ms ease-out') 
        ]),
        transition('* => void', [
            animate(('250ms ease-in'), style({
                height: 0,
                opacity: 0,
                transform: 'translateX(50%)'
            }))
        ])
    ])
]
})
export class JewelleryComponent  implements OnInit {
  
  editEnabled = false;
  jewelleryForm!: FormGroup;
  jewelleries: any;
  isResult: boolean = true;
  selectedValues: string[] = [];
  customers: any = (data as any).default;
  submitted = false;
  display: boolean = false;

  constructor(public dialogService: DialogService,
                private service: JewelleryService) { }

  ngOnInit() {
    this.jewelleryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('')
    })
    this.getJewelleries();
  }

  getJewelleries() {
    this.service.getJewelleries()
      .subscribe((data) => {
        console.log(JSON.stringify(data));
        this.jewelleries = data;
        if(this.jewelleries.length===0) {
          this.isResult=false;
        } else {
          this.isResult=true;
        }
    }); 
    this.jewelleryForm.reset();
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
    this.service.editJewellery(customer).subscribe((data) => {
      this.getJewelleries();
    });
  }

  onRowEditCancel(customer: any, index: number) {
    console.log(index);
    this.editEnabled = false;
    console.log('Row edit cancelled');
  }

  deleteJewellery(customer: any, index: number) {
    console.log(index);
    this.service.deleteJewellery(customer).subscribe((data) => {
      this.getJewelleries();
    });
  }

  show() {
    this.display = true;
  }

  onSubmit() {
    console.log(this.jewelleryForm?.value);
    this.submitted = true;
    if (this.jewelleryForm?.invalid) {
      return;
    }
    this.service.createJewellery(this.jewelleryForm?.value).subscribe(data=>{
      console.log(data);
    });
    this.getJewelleries();
    this.display=false;
  }

  get name() {
    return this.jewelleryForm?.get('name');
  }

  get filterHeading() {
    return this.jewelleryForm?.get('filterHeading');
  }
  
}
