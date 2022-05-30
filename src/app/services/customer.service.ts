import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://pap-training.azurewebsites.net/api/customer/GetCustomerCode'
  constructor(private httpClient: HttpClient) { }
  getCustomer() {

  }

  getCustomerCode() {
    return this.httpClient.get(this.url);

  }

  postCustomer() {

  }
}
