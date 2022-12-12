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

  votingTypesForm !: FormGroup;
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
    this.votingTypesForm = this.fb.group({
      name: ['', Validators.required],
      priority: ['', Validators.required],
      parameter: [[''], Validators.required],
      content: ['', Validators.required]
    });

    if (this.data) {
      this.actionButtonLabel = "update";
      this.votingTypesForm.controls['name'].setValue(this.data.name);
      this.votingTypesForm.controls['priority'].setValue(this.data.priority);
      this.votingTypesForm.controls['parameter'].setValue(this.data.parameter);
      this.votingTypesForm.controls['content'].setValue(this.data.content);
    }
  }

  addVotingType() {
    if (!this.data) {
      if (this.votingTypesForm.valid) {
        this.apiService.insertVotingTypes(this.votingTypesForm.value)
          .subscribe({
            next: res => {
              this.votingTypesForm.reset();
              this.dialogRef.close('save');
            },
            error: err => {
              console.error(err);
            }
          });
      }
    } else {
      this.updateVotingTypes();
    }
  }

  getVotingTypes() {
    this.apiService.getVotingTypes()
      .subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  updateVotingTypes() {
    if (this.votingTypesForm.valid) {
      this.apiService.putVotingTypes(this.votingTypesForm.value, this.data.id)
        .subscribe({
          next: res => {
            alert('Voting Type updated successfully');
            this.votingTypesForm.reset();
            this.dialogRef.close('update');
          }
        });
    }
  }
}
