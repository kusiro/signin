import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
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
  selectedMemberIndex: number;

  constructor(private signup: SignupService) { }

  ngOnInit() {
    this.selectedMemberIndex = 0;
  }

  get memberForm() {
    return (this.signupForm.controls['members'] as FormGroup).controls;
  }

  private memberAlert(): void {
    swal({
      title: '隊員人數須介於 3 ~ 5 人之間',
      type: 'error',
      confirmButtonText: '知道了',
      allowOutsideClick: false
    })
    .catch(swal.noop);
  }

  addMember() {
    const members: FormArray = <FormArray>this.signupForm.get('members');
    if (members.length >= 5) {
      this.memberAlert();
      return;
    }
    members.push(Member.getNewForm());
  }

  private generateRequest() {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfdH36uVrr5VA_SxYNpYA63c0BsAozUZn8G-cg7tmBWufOvzg/formResponse';
    const paramName = {
      'teamName': 'entry.1817158197',
      'name': 'entry.787550806',
      'id': 'entry.315265884',
      'gender': 'entry.1870258025',
      'birth_year': 'entry.946359540_year',
      'birth_month': 'entry.946359540_month',
      'birth_day': 'entry.946359540_day',
      'school': 'entry.1916847374',
      'department': 'entry.1880160613',
      'grade': 'entry.665767671',
      'email': 'entry.989797825',
      'mobile': 'entry.1626747519',
      'size': 'entry.1151430331',
      'food': 'entry.583333446',
      'expertise': 'entry.2123102593',
      'previous': 'entry.1240534802',
      'note': 'entry.18030584'
    };
    const teamName = this.signupForm.value['teamName'];
    const data = [...this.signupForm.value['members']];
    for (const member of data) {
      member['teamName'] = teamName;
    }

    const requests = data.map(memberData => this.signup.generateRequest(formUrl, paramName, memberData));
    const mergedRequest = requests.reduce((tmp, req) => tmp.catch(() => req));
    return mergedRequest;
  }

  selectMember(index: number) {
    this.selectedMemberIndex = index;
  }

  deleteMember() {
    const members: FormArray = <FormArray>this.signupForm.get('members');
    if (members.length <= 3) {
      this.memberAlert();
      return;
    }
    members.removeAt(this.selectedMemberIndex);
    if (members.length === this.selectedMemberIndex) {
      this.selectMember(members.length - 1);
    }
  }

  resetMember() {
    const members: FormArray = <FormArray>this.signupForm.get('members');
    members.controls[this.selectedMemberIndex].reset();
  }

  private markDirty(): void {
    this.signupForm.controls['teamName'].markAsDirty();
    const members: FormArray = <FormArray>this.signupForm.controls['members'];
    Object.keys(members.controls).map((index) => {
      const member: FormGroup = members.controls[index];
      Object.keys(member.controls).map((key) => {
        member.controls[key].markAsDirty();
      });
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

  getErrorMsg(key: string): string {
    let control: FormControl;
    if (key === 'teamName') {
      control = <FormControl>this.signupForm.get('teamName');
    } else {
      const index = this.selectedMemberIndex;
      const members: FormArray = <FormArray>this.signupForm.get('members');
      const member: FormGroup = <FormGroup>members.get(index.toString());
      control = <FormControl>member.get(key);
    }
    return Member.getErrorMsg(control);
  }

  getAllErrorMsg(member: FormGroup): string {
    const errorMsg: string[] = [];
    Object.keys(member.controls).map((key) => {
      const control: FormControl = <FormControl>member.get(key);
      errorMsg.push(Member.getErrorMsg(control));
    });
    return errorMsg.join('');
  }

  canClear(): boolean {
    const index = this.selectedMemberIndex;
    const members: FormArray = <FormArray>this.signupForm.get('members');
    const member: FormGroup = <FormGroup>members.get(index.toString());
    return member.dirty;
  }
}
