import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.scss'],
})
export class DeleteDoctorComponent {
  doctorName!: string;
  buttonName!: string;
  title!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteDoctorComponent>
  ) {
    this.doctorName = data.doctorName;
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
