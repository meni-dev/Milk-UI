import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  customer: Customer = new Customer();

  //error variable
  hasNameError: boolean = false;
  hasNumberError: boolean = false;
  hasVillageError: boolean = false;
  hasStreetError: boolean = false;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomerCode()
      .subscribe(response => {

        var resp = <CodeResponse>response;

        if (resp.status == true) {
          this.customer.customerCode = resp.data;
        }
        else {
          // redirection url
        }
      });
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

}


class CodeResponse {
  status!: boolean;
  data: string = '';
}

export class Customer {
  customerCode: string = '';
  customerName: string = '';
  phoneNumber!: string;
  village: string = '';
  streetName: string = '';
  isActive: boolean = true;

}


