import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { DeletePatientComponent } from './delete-patient/delete-patient.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent {
  allPatients: Patient[] = [];

  displayedColumns: string[] = ['name', 'mobile', 'doctor', 'gender', 'action'];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  addPatient() {
    const dialogConfig = new MatDialogConfig();

    // if close outside of dialog, dialog will not close
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register Patient',
      buttonName: 'Register',
    };

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.dataApi.addPatient(data);
        this.openSnackBar('Registration of patient is successful.', 'OK');
      }
    });
  }

  getAllPatients() {
    this.dataApi.getAllPatient().subscribe((res) => {
      this.allPatients = res.map((el: any) => {
        const data = el.payload.doc.data();
        data.patient_id = el.payload.doc.id;
        return data;
      });

      // console.log(this.doctorsArray);
      this.dataSource = new MatTableDataSource(this.allPatients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  viewPatient(row: any) {
    // console.log(row.patient_id);
    window.open('/dashboard/patient/' + row.patient_id, '_blank');
  }

  editPatient(row: any) {
    if (row.patient_id == null || row.patient_name == null) {
      return;
    }

    const dialogConfig = new MatDialogConfig();

    // if close outside of dialog, dialog will not close
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Edit Patient';
    dialogConfig.data.buttonName = 'Update';

    // dialogConfig.data.birthdate = row.birthdate.toDate();

    if (row.admission_date instanceof Date) {
      dialogConfig.data.admission_date = row.admission_date;
    } else if (
      row.admission_date != null &&
      row.admission_date.toDate instanceof Function
    ) {
      dialogConfig.data.admission_date = row.admission_date.toDate();
    }

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.dataApi.updatePatient(data);
        this.openSnackBar('Patient is updated successfully.', 'OK');
      }
    });
  }

  deletePatient(row: any) {
    const dialogConfig = new MatDialogConfig();

    // if close outside of dialog, dialog will not close
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Patient',
      buttonName: 'Delete',
      patientName: row.patient_name,
    };

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.dataApi.deletePatient(row.patient_id);
        this.openSnackBar('Patient is Deleted Successful.', 'OK');
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
