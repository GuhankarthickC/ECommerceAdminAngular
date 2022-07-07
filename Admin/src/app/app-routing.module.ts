import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [ {path:'customers',component:CustomersComponent},
{path:'orders',component:OrdersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
