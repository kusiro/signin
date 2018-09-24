import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Member } from './member';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  typeForm: FormGroup;
  individualForm: FormGroup;
  teamForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.typeForm = new FormGroup({
      'signupType': new FormControl('individual')
    });
    this.individualForm = Member.getNewForm();
    this.teamForm = new FormGroup({
      'teamName': new FormControl(null, Validators.required),
      'enterprise1': new FormControl(null),
      'enterprise2': new FormControl(null),
      'enterprise3': new FormControl(null),
      'enterprise4': new FormControl(null),
      'members': new FormArray([])
    });
    const members: FormArray = <FormArray>this.teamForm.get('members');
    for (let i = 0; i < 3; ++i) {
      members.push(Member.getNewForm());
    }
  }

}
