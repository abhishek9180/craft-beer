import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
/* import {DataSource} from '@angular/cdk/collections'; */

import { BeerItemsService } from '../services/beer-items.service';

declare var jQuery: any;

@Component({
  selector: 'home',
  templateUrl: './beer-items.component.html',
})
export class BeerItemsComponent implements OnInit {

  loading: boolean = false;
  filterValue: string = '';
  displayedColumns = ['name', 'abv', 'style', 'action'];
  dataSource: MatTableDataSource<BeerDataBean>;
  beerItems: BeerDataBean[] = [];
  cartItems = new Set();
  snackBarRef: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private beerItemsService: BeerItemsService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.loading = true;
    this.getBeerItems();
  }


  ngOnInit() {
    let items = JSON.parse(localStorage.getItem('cart-data'));
    if(items && items.length){
      items.forEach(i => {
        this.cartItems.add(i);
      });
    }
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getBeerItems() {
    //call the service and initialize the news data from API
    this.beerItemsService.getItems().subscribe((data: BeerDataBean[]) => {
      this.beerItems = data;
      let items = JSON.parse(localStorage.getItem('cart-data'));
      data.forEach(d => {
        if(items && items.length){
          items.forEach(i => {
            if(i.id === d.id) {
              d.selected = true;
            }
          }, this);
        }
      }, this);

      this.dataSource = new MatTableDataSource(data);

      this.loading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateSelectedItems(event: any, row: any) {
    if(event) {
      event.stopPropagation();
    }
    if(this.snackBarRef) {
      this.snackBarRef.dismiss();
    }

    row.selected = row.selected ? false : true;
    if(row.selected) {
      this.cartItems.add(row);
      this.snackBarRef = this.snackBar.open('Added to Cart', 'Dismiss', {
        duration: 3000
      });
    } else {
      this.cartItems.forEach(data => {
        if (data.id  === row.id) {
          this.cartItems.delete(data);
        }
      });
      this.snackBarRef = this.snackBar.open('Removed From Cart', 'Dismiss', {
        duration: 3000
      });
    }
    let localStorageData: BeerDataBean[] = [];
    this.cartItems.forEach((data, index) => {
      localStorageData.push(data);
    });
    
    //localStorage.removeItem('cart-data');
    localStorage.setItem('cart-data', JSON.stringify(localStorageData));
  }

  resetCartItems(isCheckout: boolean) {
    if(this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
    this.beerItems.forEach(a => {
      a.selected = false;
    });
    this.cartItems.clear();
    //localStorage.removeItem('cart-data');
    localStorage.setItem('cart-data', '{}');
    let message;
    if(isCheckout) {
      message = "CHEERS!! We received your order."
    } else {
      message = 'All Items Removed from Cart';
    }
    this.snackBarRef = this.snackBar.open(message, 'Dismiss', {
      duration: 3000
    });
  }

  showDetails(row: any) {
    //console.log("details");
    this.dialog.open(DialogDataExampleDialog, {
      data: row
    });
  }
  
  checkoutCartItems() {
    this.resetCartItems(true);
  }

}


@Component({
  selector: 'dialog-data',
  template: `<h1 mat-dialog-title style="text-align: center;">DETAILS</h1>
  <div mat-dialog-content>
    <mat-list role="list" class="beer-details">
      <mat-list-item role="listitem"><span>ID:&nbsp;&nbsp;</span> {{data.id ? data.id : '-'}}</mat-list-item>
      <mat-list-item role="listitem"><span>NAME:&nbsp;&nbsp;</span> {{data.name ? data.name : '-'}}</mat-list-item>
      <mat-list-item role="listitem"><span>STYLE:&nbsp;&nbsp;</span> {{data.style ? data.style : '-'}}</mat-list-item>
      <mat-list-item role="listitem"><span>ALCOHAL CONTENT:&nbsp;&nbsp;</span> {{data.abv ? data.abv : '-'}}</mat-list-item>
      <mat-list-item role="listitem"><span>IBU:&nbsp;&nbsp;</span> {{data.ibu ? data.ibu : '-'}}</mat-list-item>
      <mat-list-item role="listitem"><span>WEIGHT:&nbsp;&nbsp;</span> {{data.ounces ? data.ounces : '-'}} ounces</mat-list-item>
    </mat-list>
  </div>`,
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}



export interface BeerDataBean {
  id: number;
  name: string;
  style: string;
  abv: number;
  ibu: string;
  ounces: number;
  selected: boolean;
}