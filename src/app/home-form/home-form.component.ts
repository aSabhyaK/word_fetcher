import { Component, OnInit } from '@angular/core';
import { FormData }    from '../form-data';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {

  data = new FormData(1);
  TextArray = {};
  isSubmitted;
  isNotDecimal;
  isGreaterThanZero;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.isGreaterThanZero = true;
    this.isNotDecimal = true;
  }

  validate(){
    this.isGreaterThanZero = true;
    this.isNotDecimal = true;
    if(this.data.value <= 0) {
      this.isGreaterThanZero = false;
      return;
    } 
    if(this.data.value % 1 !== 0) {
      this.isNotDecimal = false;
      return;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isGreaterThanZero = true;
    this.isNotDecimal = true;
    if(this.data.value <= 0) {
      this.isGreaterThanZero = false;
      this.isSubmitted = false;
      return;
    } 
    if(this.data.value % 1 !== 0) {
      this.isNotDecimal = false;
      this.isSubmitted = false;
      return;
    }
    this.appService.postData(this.data).subscribe(res =>{ 
      this.TextArray = {};
      this.TextArray = res;
      this.isSubmitted = false;
      console.log(this.TextArray);
    });
  }

}
