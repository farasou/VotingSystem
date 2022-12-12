import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-bootstrap';
  showFiller = false;
  displayedColumns: string[] = ['name', 'category', 'price', 'freshness', 'date', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '400px',
        height: '800px'
      })
      .afterClosed().subscribe({
        next: (result: any) => {
          if (result == "save") {
            console.log("RESULT", result);

            this.getProducts();
          }
        }
      })
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '400px',
      height: '800px',
      data: row
    })
      .afterClosed().subscribe({
        next: (result: any) => {
          console.log("RESULT", result);

          if (result == "update") {
            this.getProducts();
          }
        }
      })
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id)
      .subscribe({
        next: (result: any) => {
          console.log("RESULT", result);
          this.getProducts();
        }
      });
  }

  getProducts() {
    this.apiService.getProducts()
      .subscribe({
        next: (products: any[] | undefined) => {
          this.dataSource = new MatTableDataSource(products);
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
