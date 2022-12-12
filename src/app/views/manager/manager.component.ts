import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/component/dialog/dialog.component';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  showFiller = false;
  displayedColumns: string[] = ['name', 'priority', 'parameter', 'content', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getVotingType();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '500px',
        height: '500px'
      })
      .afterClosed().subscribe({
        next: (result: any) => {
          this.getVotingType();
        }
      })
  }

  editVotingType(row: any) {
    this.dialog.open(DialogComponent, {
      width: '500px',
      height: '500px',
      data: row
    })
      .afterClosed().subscribe({
        next: (result: any) => {
          if (result == "update") {
            this.getVotingType();
          }
        }
      })
  }

  deleteVotingType(id: number) {
    this.apiService.deleteVotingTypes(id)
      .subscribe({
        next: (result: any) => {
          this.getVotingType();
        }
      });
  }

  getVotingType() {
    this.apiService.getVotingTypes()
      .subscribe({
        next: (votingTypes: any[] | undefined) => {
          this.dataSource = new MatTableDataSource(votingTypes);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
