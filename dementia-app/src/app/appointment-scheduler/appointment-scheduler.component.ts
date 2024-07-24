import { Component } from '@angular/core';
import { AppointmentSchedulerService } from '../services/appointment-scheduler.service';
@Component({
  selector: 'app-appointment-scheduler',
  templateUrl: './appointment-scheduler.component.html',
  styleUrl: './appointment-scheduler.component.scss'
})
export class AppointmentSchedulerComponent {
  patientTime: string = '';
  patientTimeZone: string = '';
  availableAppointments: { nurse: string, time: string }[] = [];

  constructor(private appointmentSchedulerService: AppointmentSchedulerService) {}

  scheduleAppointment() {
    console.log(this.patientTime);
    console.log(this.patientTimeZone)
    this.availableAppointments = this.appointmentSchedulerService.findAvailableAppointments(this.patientTime, this.patientTimeZone);
    this.patientTime = ''
    this.patientTimeZone = ''
    console.log(this.availableAppointments)
  }
}
