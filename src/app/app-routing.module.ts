import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './component/category/category.component';
import { JewelleryComponent } from './component/jewellery/jewellery.component';
import { PaymentComponent } from './component/payment/payment.component';
import { TopMenuComponent } from './component/top-menu/top-menu.component';

const routes: Routes = [
  {path: '', redirectTo: 'jewellery/category', pathMatch: 'full'},
  {path: 'payment', component: PaymentComponent},
  {path: 'jewellery', component: TopMenuComponent,
    children: [
      {path: 'category', component: CategoryComponent},
      {path: 'product', component: JewelleryComponent},
      {path: 'payment', component: PaymentComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
