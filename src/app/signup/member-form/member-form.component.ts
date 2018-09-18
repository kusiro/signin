import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Member } from '../member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  getErrorMsg(key: string): string {
    const control: FormControl = <FormControl>this.form.controls[key];
    return Member.getErrorMsg(control);
  }
}
