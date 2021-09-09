import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastr: ToastrService) {

  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000,
    });
  }
  showError(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
    });
  }
  showInfo(message: string) {
    this.toastr.info(message, 'Info', {
      timeOut: 3000,
    });
  }
  showWarning(message: string) {
    this.toastr.warning(message, 'Warning', {
      timeOut: 3000,
    });
  }
}
