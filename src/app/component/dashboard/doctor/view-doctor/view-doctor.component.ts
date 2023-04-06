import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { AddPatientComponent } from '../../patient/add-patient/add-patient.component';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.scss'],
})
export class ViewDoctorComponent {
  id!: any;
  doctorObj!: any;
  patientList: any[] = [];

  displayedColumns: string[] = [
    'name',
    'mobile',
    'gender',
    'prescription',
    'action',
  ];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dataApi: DataService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    // alert(this.id);
  }

  ngOnInit(): void {
    this.getDoctorById();
    this.getAllPatientsForDoctor();
  }

  getDoctorById() {
    this.dataApi.getDoctorById(this.id).subscribe((res) => {
      this.doctorObj = res;
    });
  }

  getAllPatientsForDoctor() {
    this.dataApi.getAllPatient().subscribe((res) => {
      this.patientList = res.map((el: any) => {
        const data = el.payload.doc.data();

        if (data.doctor_id === this.id) {
          data.patient_id = el.payload.doc.id;
          return data;
        }
      });

      // console.log(this.patientList);
      this.patientList = this.patientList.filter((el) => el != undefined);
      this.dataSource = new MatTableDataSource(this.patientList);
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
