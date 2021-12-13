import { Component, OnInit } from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import * as data from 'src/app/category.json';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/app/service/category/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
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
export class CategoryComponent implements OnInit {
  
  editEnabled = false;
  categoryForm!: FormGroup;
  categories: any;
  isResult: boolean = true;
  selectedValues: string[] = [];
  customers: any = (data as any).default;
  submitted = false;
  display: boolean = false;

  constructor(public dialogService: DialogService,
                private service: CategoryService) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      filterHeading: new FormControl('')
    })
    this.getCategories();
  }

  getCategories() {
    this.service.getCategories()
      .subscribe((data) => {
        console.log(JSON.stringify(data));
        this.categories = data;
        if(this.categories.length===0) {
          this.isResult=false;
        } else {
          this.isResult=true;
        }
    }); 
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
    this.service.editCategory(customer).subscribe((data) => {
      this.getCategories();
    });
  }

  onRowEditCancel(customer: any, index: number) {
    console.log(index);
    this.editEnabled = false;
    console.log('Row edit cancelled');
  }

  deleteCategory(customer: any, index: number) {
    console.log(index);
    this.service.deleteCategory(customer).subscribe((data) => {
      this.getCategories();
    });
  }

  show() {
    this.display = true;
  }

  onSubmit() {
    console.log(this.categoryForm?.value);
    this.submitted = true;
    if (this.categoryForm?.invalid) {
      return;
    }
    this.service.createCategory(this.categoryForm?.value).subscribe(data=>{
      console.log(data);
    });
    this.getCategories();
    this.display=false;
  }

  get name() {
    return this.categoryForm?.get('name');
  }

  get filterHeading() {
    return this.categoryForm?.get('filterHeading');
  }
  
}
