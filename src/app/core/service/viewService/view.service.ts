import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpServiceService } from '../../service/http/http-service.service'
import { UpdateServiceService } from '../../service/update/update-service.service'
@Injectable({
  providedIn: 'root'
})
export class ViewService {
  toggle: boolean = true;
  constructor(private http: HttpServiceService, private get: UpdateServiceService) { }
  subject = new Subject();
  getView() {
    this.gridview(this.toggle);
    return this.subject.asObservable();
  }

  gridview(result) {
    this.toggle = result
    if (this.toggle == false) {
      this.subject.next({ data: "column" });
    }
    else {
      this.subject.next({ data: "row" });

    }
  }
  getNotes() {
    this.http.getData("notes/getNotesList")
    this.get.changeMessage('');
  }

}
