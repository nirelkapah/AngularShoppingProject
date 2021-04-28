import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


  export interface DialogData {
    name: string;
    imageURL: string;
    amount: number ;
  }


  @Component({
    selector: 'dialog-windows',
    templateUrl: 'dialog-windows.html',
    styleUrls: ['./dialog-windows.css']

  })
  export class DialogWindowComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogWindowComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

