import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, filter, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/store/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import {
  getImgSrcBasedOnGameName,
  getNetworkSrcImgBasedOnSymbol,
} from 'src/app/utils';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAddressComponent } from 'src/app/standalone-comps/change-address/change-address.component';
import { ToastrService } from 'ngx-toastr';

export interface WithdrawRequest {
  game: string;
  transactionHash: string;
  network: string;
  email: string;
  walletAddress: string;
  unityId: string;
  weiRequested: number;
  status: 'pending' | 'completed' | 'error';
  errorOn?: Date;
  pendingOn?: Date;
  completedOn?: Date;
  playerPrefsOnRequest: string;
  observations: string;
  withdrawFrameworkId: string;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export interface Link {
  linkId: string;
  email: string;
  type: string;
  creator: string;
}

@Component({
  selector: 'app-withdraw-status',
  templateUrl: './withdraw-status.component.html',
  styleUrl: './withdraw-status.component.scss',
})
export class WithdrawStatusComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  private dialog = inject(MatDialog);
  private toast = inject(ToastrService);
  private userLoggedIn = signal(null as unknown as User | null | undefined);

  colDefs = [
    {
      field: 'game',
      flex: 1,
      tooltipField: 'game',
      cellRenderer: (params: { value: string }) => {
        return `
          <img
          src="${getImgSrcBasedOnGameName(params.value)}"
          width="40"
          height="40"
        />
      `;
      },
    },
    {
      field: 'status',
      flex: 1,
      cellRenderer: (params: { value: string }) => {
        switch (params.value) {
          case 'completed':
            return '<i class="fa-solid fa-check status-icon"></i> Completed';
          case 'error':
            return '<i class="fa-solid fa-triangle-exclamation status-icon"></i> Denied';
          default:
            return '<i class="fa-solid fa-clock status-icon"></i> Pending';
        }
      },
    },
    { field: 'weiRequested', flex: 1 },
    {
      field: 'network',
      flex: 1,
      cellRenderer: (params: { value: string }) => {
        return `
          <img
          src="${getNetworkSrcImgBasedOnSymbol(params.value)}"
          width="32"
          height="32"
        />
      `;
      },
    },
    {
      flex: 1,
      field: 'createdAt',
      valueFormatter: (params: { value: string }) => {
        return this.datePipe.transform(params.value);
      },
    },
    {
      field: 'walletAddress',
      flex: 1,
      onCellClicked: (event) => {
        const clickedEditWallet = (
          event.event?.target as HTMLElement
        ).classList.contains('edit-cell');
        if (
          clickedEditWallet &&
          (event.data as WithdrawRequest).status == 'pending'
        ) {
          this.openChangeWalletAddressDialog(event.data);
        }
      },
      cellRenderer: (params: { value: string; data: WithdrawRequest }) => {
        return `
        <div>
          <strong>${params.value} ${
          params.data.status == 'pending'
            ? '<i class="fa-solid fa-pen-to-square edit-cell pointer"></i>'
            : ''
        }</strong>
        </div>

      `;
      },
    },
    {
      field: 'transactionHash',
      flex: 1,
      cellRenderer: (params: { value: string }) => {
        if (!!params.value && params.value.length > 5) {
          return `<a
          class="btn btn-primary"
          href="${params.value}"
          role="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          View tx
        </a>`;
        } else {
          return ` <span>No transaction yet</span>`;
        }
      },
    },
    {
      field: 'updatedAt',
      hide: true,
      sort: 'desc',
    },
  ] as Array<ColDef>;

  public withdrawStatues = signal<Array<WithdrawRequest>>([]);
  public screenWidth: any;
  public formGroup = this.fb.group({
    email: ['', [Validators.email]],
    walletAddress: [''],
  });
  public getImgSrcBasedOnGameName = getImgSrcBasedOnGameName;

  ngOnInit(): void {
    this.authService.user$
      .pipe(filter((entry) => !!entry))
      .subscribe((user) => {
        this.userLoggedIn.set(user);
        this.formGroup.patchValue({ email: (user as User).email });
        this.getWithdraws();
      });
    this.screenWidth = window.innerWidth;
  }

  private api!: GridApi;
  onGridReady = (event: GridReadyEvent) => {
    this.api = event.api;
  };
  firstDataRenderedFn = () => {
    this.api.autoSizeAllColumns();
  };

  public getWithdraws() {
    this.userService
      .getWithdrawStatus(
        this.formGroup.controls.email.value ?? '',
        this.formGroup.controls.walletAddress.value ?? ''
      )
      .subscribe((data) => {
        this.withdrawStatues.set(data as Array<WithdrawRequest>);
      });
  }

  openChangeWalletAddressDialog(withdraw: WithdrawRequest): void {
    if (!!this.userLoggedIn() && this.userLoggedIn()?.email == withdraw.email) {
      const dialogRef = this.dialog.open(ChangeAddressComponent, {
        width: '400px',
        data: withdraw,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (!!result) {
          withdraw.walletAddress = result;
          this.userService.updateWithdraw(withdraw).subscribe(() => {
            this.getWithdraws();
            this.api.redrawRows();
          });
        }
      });
    } else {
      this.toast.warning('You can only modify your withdraws');
    }
  }
}
