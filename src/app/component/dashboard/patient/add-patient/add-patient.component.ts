import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { async } from '@firebase/util';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent {
  formRef!: FormGroup;
  title!: string;

  patient_id!: string;
  patient_name!: string;
  mobile!: string;
  gender!: string;
  admission_date!: Date;
  prescription!: string;

  buttonName!: string;

  doctor_id!: string;
  doctor_name!: string;

  allDoctors: any[] = [];

  constructor(
    private formBulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    private dataApi: DataService
  ) {
    this.title = data.title;
    this.buttonName = data.buttonName;

    // for update doctor details
    this.patient_id = data.patient_id;
    this.patient_name = data.patient_name;
    this.mobile = data.mobile;
    this.gender = data.gender;
    this.admission_date = data.admission_date;
    this.prescription = data.prescription;

    this.doctor_id = data.doctor_id;
    this.doctor_name = data.doctor_name;
  }

  ngOnInit(): void {
    this.getAllDoctors();

    this.formRef = this.formBulider.group({
      patient_id: [this.patient_id, []],
      patient_name: [this.patient_name, [Validators.required]],
      mobile: [
        this.mobile,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      gender: [this.gender, [Validators.required]],
      prescription: [this.prescription, [Validators.required]],
      admission_date: [this.admission_date, [Validators.required]],
      doctor_id: [this.doctor_id, [Validators.required]],
      doctor_name: [this.doctor_name, []],
    });
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe((data) => {
      this.allDoctors = data.map((el: any) => {
        const data = el.payload.doc.data();

        const doctor = {
          doctor_name: data.name,
          doctor_id: el.payload.doc.id,
        };
        return doctor;
      });
    });
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  async registerPatient() {
    this.formRef.value.doctor_name = await this.getDoctorName(
      this.formRef.value.doctor_id
    );
    this.dialogRef.close(this.formRef.value);
  }

  getDoctorName(doctorId: string) {
    for (let i = 0; i < this.allDoctors.length; i++) {
       if (this.allDoctors[i].doctor_id === doctorId) {
        return this.allDoctors[i].doctor_name;
      }
    }
    return '';
  }
}
