import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WithdrawRequest } from 'src/app/platform/withdraw-status/withdraw-status.component';
@Component({
  selector: 'app-change-address',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './change-address.component.html',
  styleUrl: './change-address.component.scss',
})
export class ChangeAddressComponent {
  walletAddressForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangeAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WithdrawRequest
  ) {}

  ngOnInit(): void {
    this.walletAddressForm = this.formBuilder.group({
      newAddress: ['', Validators.required],
    });
    if (this.data && this.data.walletAddress) {
      this.walletAddressForm.patchValue({
        newAddress: this.data.walletAddress,
      });
    }
  }

  onConfirm(): void {
    if (this.walletAddressForm.valid) {
      const newAddress = this.walletAddressForm.get('newAddress')?.value;
      this.dialogRef.close(newAddress);
    }
  }
}
