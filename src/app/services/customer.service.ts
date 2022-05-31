import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../customer/add-customer/add-customer.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://pap-training.azurewebsites.net/api/customer/GetCustomerCode'
  constructor(private httpClient: HttpClient) { }
  getAllCustomer() {
    return this.httpClient.get('https://pap-training.azurewebsites.net/api/Customer/GetCustomers')

  }

  getCustomerCode() {
    return this.httpClient.get(this.url);

  }

  postCustomer(customerData: Customer) {
    return this.httpClient.post('https://pap-training.azurewebsites.net/api/Customer/SaveCustomer',
      customerData)

  }
  deleteCustomer() {
    return this.httpClient.delete('https://pap-training.azurewebsites.net/api/Customer/GetCustomers')
  }
}
