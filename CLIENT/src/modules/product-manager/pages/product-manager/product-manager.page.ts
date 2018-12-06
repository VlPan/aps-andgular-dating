import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from './../../models';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProductsState } from './../../store/reducers/product.reducer';
import { getAllProducts } from './../../store/selectors/products.selectors';
import { LoadProducts, RemoveProduct, UpdateProduct, CreateProduct } from '../../store/actions/products.action';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog';
import { UpdateDialog } from '../../components/update-dialog/update-dialog';
import { AddDialog } from '../../components/add-dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.page.html',
  styleUrls: ['./product-manager.page.scss'],
  encapsulation: 2
})
export class ProductManagerPage implements OnInit, AfterViewInit {

  products$: Observable<Product[]>;

  constructor(private store: Store<any>, public dialog: MatDialog) {}

  displayedColumns: string[] = ['select', 'name', 'price', 'amount', 'updatedAt', 'edit-action', 'delete-action'];
  footerColums: string[] = ['name', 'price'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    this.store.dispatch(new LoadProducts());
    this.products$ = this.store.select(getAllProducts);
  }

  ngAfterViewInit(): void {
    this.products$.subscribe( (products: Product[]) => {
      console.log(products);
      this.dataSource.data = products;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  } );
  }

  deleteProduct(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
  }

  updateProduct(product: Product) {
    this.store.dispatch(new UpdateProduct(product));
  }

  openDeleteDialog(product: Product) {

    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { product }
    });

    const subsriber = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result) {
        this.deleteProduct(product);
        subsriber.unsubscribe();
      }

    });
  }

  openUpdateDialog(product: Product) {
    const dialogRef = this.dialog.open(UpdateDialog, {
      data: { product },
      height: '45%',
      width: '50%'
    });

    const subsriber = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result) {
        this.updateProduct(result);
        subsriber.unsubscribe();
      }
    });
  }

  openAddDialog() {


    const dialogRef =  this.dialog.open(AddDialog, {
      data: { allProducts: this.dataSource.data, selectedProducts: this.selection.selected },
      height: '90%',
      width: '90%'
    });

    const subsriber = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      const {productsForCreate, productsForUpdate} = result;
      productsForUpdate.forEach(element => {
        this.store.dispatch(new UpdateProduct(element));
      });
      productsForCreate.forEach(element => {
        this.store.dispatch(new CreateProduct(element));
      });
    });

  }

  getTotalCost() {
    let total = 0;

    for (let i = 0; i < this.dataSource.data.length; i++ ) {
      const currentProduct = this.dataSource.data[i];
      total += currentProduct.price  * currentProduct.amount;
    }
    return total;
  }

}
