import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) { }

  private getSubmitUrl(formUrl: string, paramName, data): string {
    /* create a copy of data */
    const submitData = {...data};
    /* convert null to empty string */
    Object.keys(submitData).map((key) => {
      if (submitData[key] === null) {
        submitData[key] = '';
      }
    });
    /* translate gender */
    submitData['gender'] = (submitData['gender'] === 'male' ? '男' : '女');
    /* convert birth date format */
    const birth: number[] = submitData['birth'].split('/').map((value) => Number(value));
    submitData['birth_year'] = birth[0].toString();
    submitData['birth_month'] = birth[1].toString();
    submitData['birth_day'] = birth[2].toString();
    /* convert phone number format */
    const mobile: string = submitData['mobile'];
    submitData['mobile'] = [mobile.substring(0, 4), mobile.substring(4, 7), mobile.substring(7, 10)].join('-');
    /* translate food */
    submitData['food'] = (submitData['food'] === 'vegetarian' ? '素' : '葷');
    /* encode & concat query params */
    const params = Object.keys(paramName).map((key) => paramName[key] + '=' + encodeURIComponent(submitData[key])).join('&');
    /* submit url */
    const submitUrl = formUrl + '?' + params;
    return submitUrl;
  }

  generateRequest(formUrl: string, paramName, data): Observable<Object> {
    const submitUrl = this.getSubmitUrl(formUrl, paramName, data);
    return this.http.jsonp(submitUrl, 'callback');
  }

  submit(request: Observable<Object>) {
    swal({
      title: '確定要送出報名資料？',
      text: '送出後若資料有誤 需寄信至主辦單位修改',
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      cancelButtonColor: '#c82333',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          request.subscribe(null, () => {
            resolve();
          });
        });
      }
    })
    .then(() => {
      swal({
        title: '報名成功！',
        text: '即將返回黑客松首頁',
        type: 'success',
        confirmButtonText: '確認',
        allowOutsideClick: false
      })
      .then(() => {
        location.href = 'http://hackathon.nctu.me/2018';
      });
    })
    .catch(swal.noop);
  }
}
