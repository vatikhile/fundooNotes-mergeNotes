import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material';
// import { cartComponent } from "../ecart/ecart.component";
import { Router } from '@angular/router';
export interface DialogData {
  name: string,
  price: string,
  description: string,
  id: string
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router,private dialog:MatDialog) { }

  ngOnInit() {
  }
/**
 * @description this method is for close the dialog box
 * @returns nothing
 */
close(): void {
  try {
    // this.dialogRef.close();
    this.dialog.closeAll();

  } catch (error) {
    console.log('error in close in service Component');

  }
}


/**
 * @description this method is for navigating the page to register with selected sevice
 */
Checkout() {
  // this.dialogRef.close();
  this.dialog.closeAll();
  this.router.navigate(['register']);
}
}



