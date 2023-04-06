import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
  formRef!: FormGroup;
  title!: string;
  name!: string;
  mobile!: string;
  email!: string;
  gender!: string;
  department!: string;
  birthdate!: Date;
  qualification!: string;
  id!: string;
  buttonName!: string;

  departments: string[] = [
    'Cardiologist',
    'Oncologist',
    'Gastroenterologist',
    'Pulmonologist',
    'Nephrologist',
    'Endocrinologist',
    'Ophthalmologist',
    'Otolaryngologist',
    'Dermatologist',
    'Psychiatrist',
    'Neurologist',
    'Radiologist',
    'Anesthesiologist',
    'Surgeon',
  ];

  constructor(
    private formBulider: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddDoctorComponent>
  ) {
    this.title = data.title;
    this.buttonName = data.buttonName;

    // for update doctor details
    this.id = data.id;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.gender = data.gender;
    this.department = data.department;
    this.birthdate = data.birthdate;
    this.qualification = data.qualification;
  }

  ngOnInit(): void {
    this.formRef = this.formBulider.group({
      id: [this.id, []],
      name: [this.name, [Validators.required]],
      mobile: [
        this.mobile,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      email: [this.email, [Validators.required, Validators.email]],
      gender: [this.gender, [Validators.required]],
      department: [this.department, [Validators.required]],
      birthdate: [this.birthdate, [Validators.required]],
      qualification: [this.qualification, [Validators.required]],
    });
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  registerDoctor() {
    this.dialogRef.close(this.formRef.value);
  }
}
