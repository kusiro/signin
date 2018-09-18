import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert2';

import { SignupService } from '../signup.service';
import { Member } from '../member';

@Component({
  selector: 'app-individual-signup',
  templateUrl: './individual-signup.component.html',
  styleUrls: ['./individual-signup.component.css']
})
export class IndividualSignupComponent implements OnInit {
  @Input() signupForm: FormGroup;

  constructor(private signup: SignupService) { }

  ngOnInit() {
  }

  resetMember() {
    this.signupForm.reset();
  }

  private generateRequest(): Observable<Object> {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScj6xBUn1bPn9bf8yebHYA6qkP7pLckA9_hQDBcedudknFZ2w/formResponse';
    const paramName = {
      'name': 'entry.1321213087',
      'id': 'entry.1289122462',
      'gender': 'entry.1872471914',
      'birth_year': 'entry.534305761_year',
      'birth_month': 'entry.534305761_month',
      'birth_day': 'entry.534305761_day',
      'school': 'entry.753473231',
      'department': 'entry.1912403436',
      'email': 'entry.354521163',
      'mobile': 'entry.1089805234',
      'size': 'entry.419900133',
      'food': 'entry.636060973',
      'expertise': 'entry.553302377',
      'note': 'entry.807533886'
    };
    const data = {...this.signupForm.value};
    return this.signup.generateRequest(formUrl, paramName, data);
  }

  private markDirty(): void {
    const member: FormGroup = this.signupForm;
    const controls = member.controls;
    Object.keys(controls).map((key) => {
      controls[key].markAsDirty();
    });
  }

  onSubmit() {
    this.markDirty();

    if (this.signupForm.invalid) {
      Member.formErrorAlert();
      return;
    }

    const request = this.generateRequest();
    this.signup.submit(request);
  }

  canClear(): boolean {
    return this.signupForm.dirty;
  }
}
