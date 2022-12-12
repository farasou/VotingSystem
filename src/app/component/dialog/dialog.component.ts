import { Component, inject, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // freshness
  freshnessLevels = ["Fresh", "Medium", "Old"];

  // products form using form builder
  productsForm !: FormGroup;
  actionButtonLabel: string = "save";
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productsForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      freshness: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if (this.data) {
      // if there are data passed, means the EDIT button is clicked, not the ADD button
      this.actionButtonLabel = "update";
      this.productsForm.controls['name'].setValue(this.data.name);
      this.productsForm.controls['category'].setValue(this.data.category);
      this.productsForm.controls['price'].setValue(this.data.price);
      this.productsForm.controls['freshness'].setValue(this.data.freshness);
      this.productsForm.controls['comment'].setValue(this.data.comment);
      this.productsForm.controls['date'].setValue(this.data.date);
    }
  }

  addProduct() {
    if (!this.data) {
      // if there are no data passed, means the ADD button is clicked, not the EDIT button
      if (this.productsForm.valid) {
        this.apiService.insertProduct(this.productsForm.value)
          .subscribe({
            next: res => {
              console.log("RESULT MOTHERFUCKER", res);
              this.productsForm.reset();
              this.dialogRef.close('save');

            },
            error: err => {
              console.log("ERROR MOTHERFUCKER", err);
            }
          });
      }
    } else {
      this.updateProduct();
    }
  }

  getProducts() {
    this.apiService.getProducts()
      .subscribe({
        next: (res: any) => {
          console.log("RESULT MOTHERFUCKER", res);
        },
        error: (err: any) => {
          console.log("ERROR MOTHERFUCKER", err);
        }
      });
  }

  updateProduct() {
    if (this.productsForm.valid) {
      this.apiService.putProduct(this.productsForm.value, this.data.id)
        .subscribe({
          next: res => {
            console.log("RESULT MOTHERFUCKER", res);
            alert('Product updated successfully');
            this.productsForm.reset();
            this.dialogRef.close('update');
          }
        });
    }
  }
}
