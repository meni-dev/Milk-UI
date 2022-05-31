import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../add-customer/add-customer.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customer: Customer = new Customer();
  //error variable
  hasNameError: boolean = false;
  hasNumberError: boolean = false;
  hasVillageError: boolean = false;
  hasStreetError: boolean = false;

  customerList: Customer[] = [];
  updateCustomerdata!: Customer;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    console.log("ngOnInit")
    this.customerService.getAllCustomer()
      .subscribe(response => {
        var resp = <AllCustomer>response;

        if (resp.status == true) {
          this.customerList = resp.data;

        } else {
          this.customerList = [];
        }

      });

  }
  getAllCustomer() {

  }

  deleteitem() {

  }
  onSubmit() {

    if (this.customer.customerName.length == 0) {
      this.hasNameError = true;
    } else {
      this.hasNameError = false;
    }

    if (this.customer.phoneNumber == undefined || this.customer.phoneNumber == null) {
      this.hasNumberError = true;
    } else {
      if (this.customer.phoneNumber.toString().length == 10) {
        this.hasNumberError = false;
      } else {
        this.hasNumberError = true;
      }
    }

    if (this.customer.village.length == 0) {
      this.hasVillageError = true;
    } else {
      this.hasVillageError = false;
    }

    if (this.customer.streetName.length == 0) {
      this.hasStreetError = true;
    } else {
      this.hasStreetError = false;
    }


    if (this.hasNameError == false && this.hasNameError == false
      && this.hasVillageError == false && this.hasStreetError == false) {
      this.customerService.postCustomer(this.customer).subscribe(response => {

        console.log(response)
      });
    }

  }
  resetform() {
    this.customer.customerName = ''
    this.customer.phoneNumber = ''
    this.customer.streetName = ''
    this.customer.village = ''
    this.customer.isActive = true;
  }
  fillCustomerData(person: Customer) {
    this.customer = person;

  }


}

class AllCustomer {
  status!: boolean;
  data!: Customer[];
}
