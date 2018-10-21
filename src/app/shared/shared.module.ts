import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgeInputComponent } from "./age-input/age-input.component";
import { ComfirmDialogComponent } from './comfirm-dialog/comfirm-dialog.component';
import { DirectiveModule } from "../directive/directive.module";
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSelectModule,
    DirectiveModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    AgeInputComponent,
    ImageListSelectComponent,
    DirectiveModule
  ],
  declarations: [AgeInputComponent, ComfirmDialogComponent, ImageListSelectComponent],
  entryComponents: [ComfirmDialogComponent]
})
export class SharedModule {}
