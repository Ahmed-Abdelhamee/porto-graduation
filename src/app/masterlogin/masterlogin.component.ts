import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-masterlogin',
  templateUrl: './masterlogin.component.html',
  styleUrls: ['./masterlogin.component.scss']
})
export class MasterloginComponent implements OnInit {

  constructor( private route:Router) { }

  ngOnInit(): void {
  }

  alertMsg:string;

  check(sign){
    let data = sign.value;
    if(data.name=="egypt" && data.pwd=="egypt2017")
    {
      this.route.navigate(["\category"]);
    }else{
      this.alertMsg="you are not Master to get login";
    }
  }
}
