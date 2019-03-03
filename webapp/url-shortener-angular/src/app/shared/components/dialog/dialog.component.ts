import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Dialog } from '../../models/dialog.model';


@Component({
  selector: 'modal-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  private dialogModel:Dialog;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router) {

      this.dialogModel = new Dialog();
      //Passing input values
      if(data){
        this.dialogModel.deserialize(data);
      }
  }

  onCancelClick(): any {
    this.dialogRef.close({ data: false });
    //if callback exists
  }

  onAcceptClick(): any {
    this.dialogRef.close({ data: true });

  }

}
