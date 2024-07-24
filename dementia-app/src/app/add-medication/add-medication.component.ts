import { Component } from '@angular/core';
import { MedicationService } from '../services/medication.service';
import { Medication } from '../services/model/model.model';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss']
})
export class AddMedicationComponent {
  medication: Medication = {
    id: 0,
    name: '',
    dosage: '',
    frequency: '',
    startDate: new Date(),
    endDate: new Date()
  };

  constructor(private medicationService: MedicationService) { }

  addMedication(): void {
      this.medication.id = new Date().getTime(); 
      this.medicationService.addMedication(this.medication);
      alert('Medication added successfully!');
      this.resetForm(); 
  }

  private resetForm(): void {
    this.medication = {
      id: 0,
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date(),
      endDate: new Date()
    };
  }
}
