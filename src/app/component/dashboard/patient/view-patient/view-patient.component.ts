import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss'],
})
export class ViewPatientComponent {
  id!: any;
  patientObj!: any;

  constructor(private route: ActivatedRoute, private dataApi: DataService) {
    this.id = this.route.snapshot.paramMap.get('id');
    // alert(this.id);
  }

  ngOnInit(): void {
    this.getPatientById();
  }

  getPatientById() {
    this.dataApi.getPatientById(this.id).subscribe((res) => {
      this.patientObj = res;
    });
    // console.log(this.patientObj);
  }
}
