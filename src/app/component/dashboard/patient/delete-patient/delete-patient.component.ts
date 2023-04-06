import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.scss'],
})
export class DeletePatientComponent {
  patientName!: string;
  buttonName!: string;
  title!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeletePatientComponent>
  ) {
    this.patientName = data.patientName;
    this.buttonName = data.buttonName;
    this.title = data.title;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }

}
