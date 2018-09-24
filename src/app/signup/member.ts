import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import swal from 'sweetalert2';

export class Member {
  static fieldName = {
    'name': '姓名',
    'id': '身份證字號',
    'gender': '性別',
    'birth': '生日',
    'school': '學校',
    'department': '科系',
    'grade': '年級',
    'email': 'Email',
    'mobile': '手機',
    'size': '衣服尺寸',
    'food': '飲食',
    'expertise': '專長',
    'previous': '過去經歷',
    'note': '備註'
  };

  static getNewForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl(null, Validators.required),
      'id': new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][12ABCD]\d{8}$/), Member.validID]),
      'gender': new FormControl(null, Validators.required),
      'birth': new FormControl(null, [Validators.required, Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/), Member.validDate]),
      'school': new FormControl(null, Validators.required),
      'department': new FormControl(null, Validators.required),
      'grade': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'mobile': new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/), Member.validPhone]),
      'size': new FormControl(null, Validators.required),
      'food': new FormControl(null, Validators.required),
      'expertise': new FormControl(null, Validators.required),
      'previous': new FormControl(null, Validators.required),
      'note': new FormControl(null)
    });
  }

  static getErrorMsg(control: FormControl): string {
    if (control.valid || (control.pristine && control.untouched)) {
      return '';
    } else {
      const errors = control.errors;
      const errorMsg: string[] = [];
      if (errors['required']) {
        errorMsg.push('必填');
      } else {
        if (errors['pattern'] || errors['email']) {
          errorMsg.push('格式錯誤');
        } else {
          errorMsg.push('資料不合法');
        }
      }
      return errorMsg.join(' ');
    }
  }

  static formErrorAlert(): void {
    swal({
      title: 'Oops...',
      text: '請檢查欄位是否正確填寫',
      type: 'error',
      allowOutsideClick: false
    });
  }

  static validPhone(control: FormControl): {[k: string]: boolean} {
    const phone: string = control.value;
    const phoneRegExp = /^09\d*$/;
    if (phoneRegExp.test(phone)) {
      return null;
    } else {
      return {'phone': true};
    }
  }

  static validDate(control: FormControl): {[k: string]: boolean} {
    const date: string = control.value;
    const dateRegExp = /^\d{4}\/\d{2}\/\d{2}$/;
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dateRegExp.test(date)) {
      const dateSp = date.split('/');
      const year = Number(dateSp[0]);
      const month = Number(dateSp[1]);
      const day = Number(dateSp[2]);
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        days[2 - 1] += 1;
      }
      if (month < 1 || month > 12) {
        return {'date': true};
      }
      if (day < 1 || day > days[month - 1]) {
        console.log(days[month - 1]);
        return {'date': true};
      }
    }
    return null;
  }

  static validID(control: FormControl): {[k: string]: boolean} {
    const valMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                    'J', 'K', 'L', 'M', 'N',
                    'P', 'Q', 'R', 'S', 'T', 'U', 'V',
                    'X', 'Y',
                    'W',
                    'Z',
                    'I',
                    'O'];
    const coefMap = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
    const id = control.value;
    const idRegExp = /^[A-Z][12ABCD]\d{8}$/;
    let tmp = '';
    let sum = 0;
    if (idRegExp.test(id)) {
      for (const c of id) {
        tmp += valMap.indexOf(c).toString();
      }
      tmp = tmp.substr(0, 2) + tmp.substr(-9);
      for (let i = 0; i < tmp.length; ++i) {
        sum += Number(tmp[i]) * coefMap[i];
      }
      if (sum % 10 === 0) {
        return null;
      } else {
        return {'id': true};
      }
    }
    return null;
  }
}
