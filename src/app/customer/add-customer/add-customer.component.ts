import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerCode!: string;
  customerName: string = '';
  mobileNumber!: number;
  street: string = '';
  village: string = '';
  isActive: boolean = true;

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
          this.customerCode = resp.data;
        }
        else {
          // redirection url
        }
      });
  }
  onSubmit() {

    if (this.customerName.length == 0) {
      this.hasNameError = true;
    } else {
      this.hasNameError = false;
    }

    if (this.mobileNumber == undefined || this.mobileNumber == null) {
      this.hasNumberError = true;
    } else {
      if (this.mobileNumber.toString().length == 10) {
        this.hasNumberError = false;
      } else {
        this.hasNumberError = true;
      }
    }

    if (this.village.length == 0) {
      this.hasVillageError = true;
    } else {
      this.hasVillageError = false;
    }

    if (this.street.length == 0) {
      this.hasStreetError = true;
    } else {
      this.hasStreetError = false;
    }


    if (this.hasNameError == false && this.hasNameError == false
      && this.hasVillageError == false && this.hasStreetError == false) {
      this.customerService.postCustomer();
    }

  }
  resetform() {
    this.customerCode = ''
    this.customerName = ''
    this.mobileNumber = 0
    this.street = ''
    this.village = ''
    this.isActive = true;
  }

}


class CodeResponse {
  status!: boolean;
  data: string = '';
}


