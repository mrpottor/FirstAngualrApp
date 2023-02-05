
import { Component, OnInit } from '@angular/core';
import { RegistrationService,} from '../registration.service';
import { Registration } from '../registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrations: Registration[]=[];

  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    this.getRegistrations();
  }

  getRegistrations(): void {
    this.registrationService.getRegistrations()
      .subscribe(registrations => this.registrations = registrations);
  }

  add(firstName: string, lastName: string, email: string, password: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    if (!firstName || !lastName || !email || !password) { return; }
    this.registrationService.addRegistration({ firstName, lastName, email, password } as Registration)
      .subscribe(registration => {
    this.registrations.push(registration);
      });
  }

  delete(registration: Registration): void {
    this.registrations = this.registrations.filter(h => h !== registration);
    this.registrationService.deleteRegistration(registration).subscribe();
  }
}

