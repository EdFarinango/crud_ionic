import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRegPage } from './create-reg.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRegPageRoutingModule {}
