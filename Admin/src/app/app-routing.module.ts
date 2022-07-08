import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminslistComponent } from './adminslist/adminslist.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [ 
  {path:'customers',component:CustomersComponent},
{path:'orders',component:OrdersComponent},
{path:'adminslist', component:AdminslistComponent},
{path:'register', component:RegisterComponent},{path:'products', component:ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
