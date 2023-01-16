import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRegPageRoutingModule } from './list-reg-routing.module';

import { ListRegPage } from './list-reg.page';
import { inject } from '@angular/core/testing';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRegPageRoutingModule
  ],
  declarations: [ListRegPage]
})
export class ListRegPageModule {}
