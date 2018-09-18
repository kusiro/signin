import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-size-info',
  templateUrl: './size-info.component.html',
  styleUrls: ['./size-info.component.css']
})
export class SizeInfoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  showInfo() {
    swal({
      title: '衣服尺寸對照表',
      html:
        '<table class="table table-sm table-bordered">' +
        '  <tbody>' +
        '    <tr>' +
        '      <td></td><td>XS</td><td>S</td><td>M</td><td>L</td><td>XL</td><td>2L</td><td>3L</td>' +
        '    </tr>' +
        '    <tr>' +
        '      <td>胸寬</td><td>43</td><td>47</td><td>50</td><td>54</td><td>58</td><td>61</td><td>69</td>' +
        '    </tr>' +
        '    <tr>' +
        '      <td>身長</td><td>56</td><td>61</td><td>67</td><td>71</td><td>76</td><td>80</td><td>86</td>' +
        '    </tr>' +
        '  </tbody>' +
        '</table>' +
        '<small id="sizeHelpBlock" class="form-text text-muted">' +
        '  單位 : 公分' +
        '</small>'
    })
    .catch(swal.noop);
  }
}
