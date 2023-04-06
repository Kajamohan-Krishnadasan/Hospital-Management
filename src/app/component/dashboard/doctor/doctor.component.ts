import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { DataService } from 'src/app/shared/service/data.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  doctorsArray: Doctor[] = [];
  displayedColumns: string[] = [
    'name',
    'mobile',
    'department',
    'gender',
    'action',
  ];
  dataSource!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private dataApi: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllDoctors();
  }

  addDoctor() {
    const dialogConfig = new MatDialogConfig();

    // if close outside of dialog, dialog will not close
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register Doctor',
      buttonName: 'Register',
    };

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.dataApi.addDoctor(data);
        this.openSnackBar('Registration of doctor is successful.', 'OK');
      }
    });
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe((data) => {
      this.doctorsArray = data.map((el: any) => {
        const data = el.payload.doc.data();
        data.id = el.payload.doc.id;
        return data;
      });

      // console.log(this.doctorsArray);
      this.dataSource = new MatTableDataSource(this.doctorsArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editDoctor(row: any) {
    if (row.id == null || row.name == null) {
      return;
    }

    const dialogConfig = new MatDialogConfig();

    // if close outside of dialog, dialog will not close
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Edit Doctor';
    dialogConfig.data.buttonName = 'Update';

    // dialogConfig.data.birthdate = row.birthdate.toDate();

    if (row.birthdate instanceof Date) {
      dialogConfig.data.birthdate = row.birthdate;
    } else if (
      row.birthdate != null &&
      row.birthdate.toDate instanceof Function
    ) {
      dialogConfig.data.birthdate = row.birthdate.toDate();
    }

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.dataApi.updateDoctor(data);
        this.openSnackBar('Doctor is updated successfully.', 'OK');
      }
    });
  }

  deleteDoctor(row: any) {
    const dialogConfig = new MatDialogConfig();

    // if close outside of dialog, dialog will not close
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Doctor',
      buttonName: 'Delete',
      doctorsName: row.name,
    };

    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.dataApi.deleteDoctor(row.id);
        this.openSnackBar('Doctor is Deleted Successful.', 'OK');
      }
    });
  }

  viewDoctor(row: any) {
    window.open('/dashboard/doctor/' + row.id, '_blank');
  }

  // pop up message
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
