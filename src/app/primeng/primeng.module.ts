import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { TimelineModule } from 'primeng/timeline';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

const primeng = [
  StepsModule,
  TimelineModule,
  InputMaskModule,
  ButtonModule,
  CardModule,
  InputTextModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, primeng
  ],
  exports: [primeng]
})
export class PrimengModule { }
