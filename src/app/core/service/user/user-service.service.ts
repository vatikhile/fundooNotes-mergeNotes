import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpServiceService } from '../http/http-service.service'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = environment.baseUrl;
  constructor(private httpService: HttpServiceService) { }

  register(data) {
    return this.httpService.postRequest("user/userSignUp", data)

  }
  login(data) {
    return this.httpService.postRequest("user/login", data)

  }
  forgot(data) {
    return this.httpService.postRequest("user/reset", data)

  }
  resetPassword(data) {
    return this.httpService.post("user/reset-password", data)

  }
}
