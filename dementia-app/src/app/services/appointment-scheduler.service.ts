import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSchedulerService {
  private nurses = [
    { name: 'America Nurse', timeZone: 'America/New_York' },
    { name: 'Europe Nurse', timeZone: 'Europe/London' },
  ];

  constructor() {}

  private isWithinWorkingHours(time: moment.Moment, timeZone: string): boolean {
    const start = moment.tz('09:00', 'HH:mm', timeZone);
    const end = moment.tz('21:00', 'HH:mm', timeZone);
    const result = time.isBetween(start, end, undefined, '[]');
    return result;
  }

  findAvailableAppointments(patientTime: string, patientTimeZone: string): { nurse: string, time: string }[] {
    const appointments = [];
    const patientMoment = moment.tz(patientTime, patientTimeZone);

    for (const nurse of this.nurses) {
      const nurseTime = patientMoment.clone().tz(nurse.timeZone);
      if (this.isWithinWorkingHours(nurseTime, nurse.timeZone)) {
        appointments.push({ nurse: nurse.name, time: nurseTime.format('YYYY-MM-DD HH:mm') });
      }
    }
    return appointments;
  }
}
