import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { registdata } from '../registdata.interface';
import { FirebasedataService } from '../services/firebasedata.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor(private datastore:AngularFirestore , private dataSevice:FirebasedataService) { }

  registdata:registdata[];
  registdataIndex:number=0;
  registdataLength:number=0;
  
  alertMsg:string;
  alertColor:string;
  count:number=0;
  getDocid:string;

   date=new Date();
   currentDate=this.date.toLocaleDateString()
   currentDay:string="";
   currentMonth:string="";
   currentYear:string="";
   NumcurrentDay:number;
   NumcurrentMonth:number;
   NumcurrentYear:number;

   getdateLeave:string;
   leaveDay:string="";
   leaveMonth:string="";
   leaveYear:string="";
   NumleaveDay:number;
   NumleaveMonth:number;
   NumleaveYear:number;

   getdateArrive:string;
   ArriveDay:string="";
   ArriveMonth:string="";
   ArriveYear:string="";
   NumArriveDay:number;
   NumArriveMonth:number;
   NumArriveYear:number;

   
  //  getdata:registdata[]=new Array(this.registdataLength);

  ngOnInit(): void{
    
    // set the current date Code
    console.log(this.currentDate);
    for(this.count;this.currentDate[this.count]!="/";this.count++){
      this.currentMonth+=this.currentDate[this.count];
    }
    this.count++;
    for(this.count;this.currentDate[this.count]!="/";this.count++){
      this.currentDay+=this.currentDate[this.count];
    }
    this.count++;
    for(this.count;this.count<this.currentDate.length;this.count++){

      this.currentYear+=this.currentDate[this.count];
    }
    this.NumcurrentDay=parseInt(this.currentDay);
    this.NumcurrentMonth=parseInt(this.currentMonth)
    this.NumcurrentYear=parseInt(this.currentYear)
    // console.log(this.NumcurrentDay)
    // console.log(this.NumcurrentMonth) 
    // console.log(this.NumcurrentYear)


    this.datastore.collection("data").snapshotChanges().subscribe(data =>{
      this.registdata=data.map(element =>{
        return {
          email:element.payload.doc.data()["email"],
          name:element.payload.doc.data()["name"],
          phone:element.payload.doc.data()["phone"],
          single:element.payload.doc.data()["Singleroom"],
          double:element.payload.doc.data()["Doubleroom"],
          dateArrive:element.payload.doc.data()["dateArrive"],
          dateleave:element.payload.doc.data()["dateleave"],
          docId:element.payload.doc.id
        }
      })

      // reservation check code
      this.registdataLength=this.registdata.length;
      console.log(" doc nums  "+this.registdata.length);

      data.map(checker=>{

        this.getdateLeave=checker.payload.doc.data()['dateleave'];
        this.getdateArrive=checker.payload.doc.data()['dateArrive'];
        
        //set date Arive code
        // console.log(this.getdateArrive)
        for(let i=0;i<4;i++){
          this.ArriveYear+=this.getdateArrive[i];
        }
        for(let i=5;i<7;i++){
          this.ArriveMonth+=this.getdateArrive[i];
        }
        for(let i=8;i<10;i++){
          this.ArriveDay+=this.getdateArrive[i];
        }
        this.NumArriveDay=parseInt(this.ArriveDay);
        this.NumArriveMonth=parseInt(this.ArriveMonth);
        this.NumArriveYear=parseInt(this.ArriveYear);
        // console.log(this.NumArriveDay);
        // console.log(this.NumArriveMonth) ;
        // console.log(this.NumArriveYear);
        this.ArriveDay="";
        this.ArriveMonth="";
        this.ArriveYear="";

        //set date leave code
        // console.log(this.getdateLeave)
        for(let i=0;i<4;i++){
          this.leaveYear+=this.getdateLeave[i];
        }
        for(let i=5;i<7;i++){
          this.leaveMonth+=this.getdateLeave[i];
        }
        for(let i=8;i<10;i++){
          this.leaveDay+=this.getdateLeave[i];
        }
        this.NumleaveYear=parseInt(this.leaveYear);
        this.NumleaveMonth=parseInt(this.leaveMonth);
        this.NumleaveDay=parseInt(this.leaveDay);
        // console.log(this.NumleaveDay);
        // console.log(this.NumleaveMonth) ;
        // console.log(this.NumleaveYear);
        this.leaveDay="";
        this.leaveMonth="";
        this.leaveYear="";
        

        
        if(this.registdataIndex<this.registdataLength){

          // the check of reservation ended code
          if(this.NumcurrentYear>this.NumleaveYear)
          {
            this.registdata[this.registdataIndex].alertColor="";         
            this.registdata[this.registdataIndex].alertMsg=""; 
            this.registdata[this.registdataIndex].alertColor="alert-danger";         
            this.registdata[this.registdataIndex].alertMsg="ended"; 
            this.registdataIndex++;     
          }else if (this.NumcurrentYear==this.NumleaveYear) 
          {
            if(this.NumcurrentMonth>this.NumleaveMonth)
            {
              this.registdata[this.registdataIndex].alertColor="";         
              this.registdata[this.registdataIndex].alertMsg=""; 
              this.registdata[this.registdataIndex].alertColor="alert-danger";         
              this.registdata[this.registdataIndex].alertMsg="ended";
              this.registdataIndex++;

            }else if ( this.NumcurrentMonth==this.NumleaveMonth ) 
            {
              if( this.NumcurrentDay>=this.NumleaveDay)
              {
                this.registdata[this.registdataIndex].alertColor="";         
                this.registdata[this.registdataIndex].alertMsg=""; 
                this.registdata[this.registdataIndex].alertColor="alert-danger";         
                this.registdata[this.registdataIndex].alertMsg="ended";
                this.registdataIndex++;     
              }
            }
              

          }

          // the check of reservation waiting code 
          if (this.NumcurrentYear<this.NumArriveYear) 
          {
            this.registdata[this.registdataIndex].alertColor="";         
            this.registdata[this.registdataIndex].alertMsg="";
            this.registdata[this.registdataIndex].alertColor="alert-warning";         
            this.registdata[this.registdataIndex].alertMsg="waiting"; 
            this.registdataIndex++;     
          }
          else if (this.NumcurrentYear==this.NumArriveYear)
          {
            if(this.NumcurrentMonth<this.NumArriveMonth){
              this.registdata[this.registdataIndex].alertColor="";         
              this.registdata[this.registdataIndex].alertMsg="";
              this.registdata[this.registdataIndex].alertColor="alert-warning";         
              this.registdata[this.registdataIndex].alertMsg="waiting"; 
              this.registdataIndex++;  

            }else if(this.NumcurrentMonth==this.NumArriveMonth)
            {
              if( this.NumcurrentDay<this.NumArriveDay){
                this.registdata[this.registdataIndex].alertColor="";         
                this.registdata[this.registdataIndex].alertMsg="";
                this.registdata[this.registdataIndex].alertColor="alert-warning";         
                this.registdata[this.registdataIndex].alertMsg="waiting";
                this.registdataIndex++;
              }
              else{
              this.registdata[this.registdataIndex].alertColor="";         
              this.registdata[this.registdataIndex].alertMsg="";
              this.registdata[this.registdataIndex].alertColor="alert-success";         
              this.registdata[this.registdataIndex].alertMsg="existing";
              this.registdataIndex++;
              }
          
            }

          } 
          
        }

      })

    });


    // for(let x=0;x<this.registdataLength;x++){
    //   this.getdata[x]={
    //   name:this.registdata[x].name,
    //   phone:this.registdata[x].phone,
    //   email:this.registdata[x].email,
    //   single:this.registdata[x].single,
    //   double:this.registdata[x].double,
    //   dateArrive:this.registdata[x].dateArrive,
    //   dateleave:this.registdata[x].dateleave,
    //   docId:this.registdata[x].docId,
    //   alertColor:this.registdata[x].alertColor,
    //   alertMsg:this.registdata[x].alertMsg
    //   }
    //   console.log(this.registdata[0])
    // }

  }



  getdata:registdata[]=new Array(this.registdataLength);

  showdata(){
    for(let x=0;x<this.registdataLength;x++){
      this.getdata[x]={
      name:this.registdata[x].name,
      phone:this.registdata[x].phone,
      email:this.registdata[x].email,
      single:this.registdata[x].single,
      double:this.registdata[x].double,
      dateArrive:this.registdata[x].dateArrive,
      dateleave:this.registdata[x].dateleave,
      docId:this.registdata[x].docId,
      alertColor:this.registdata[x].alertColor,
      alertMsg:this.registdata[x].alertMsg
      }
    }
    console.log(this.getdata);

  }

  reload(){
    window.location.reload();
  }


  delete(id){
    this.datastore.collection("data").doc(id).delete();
  }
  getgetDocid(id){
    this.getDocid=id;
  }
  update(f){
    let getdata=f.value;
    console.log(getdata.dateArrive)
    console.log(getdata.dateleave)
    
    this.datastore.collection("data").doc(this.getDocid).update({
      dateArrive:getdata.dateArrive,
      dateleave:getdata.dateleave      
    }).then(()=>{
      window.location.reload();
    });

    if(this.registdataIndex<this.registdataLength){
      if(this.NumcurrentYear>this.NumleaveYear)
      {
        this.registdata[this.registdataIndex].alertColor="";         
        this.registdata[this.registdataIndex].alertMsg=""; 
        this.registdata[this.registdataIndex].alertColor="alert-danger";         
        this.registdata[this.registdataIndex].alertMsg="extended"; 
        this.registdataIndex++;
        }else if (this.NumcurrentYear==this.NumleaveYear && this.NumcurrentMonth>this.NumleaveMonth) 
      {
        this.registdata[this.registdataIndex].alertColor="";         
        this.registdata[this.registdataIndex].alertMsg=""; 
        this.registdata[this.registdataIndex].alertColor="alert-danger";         
        this.registdata[this.registdataIndex].alertMsg="extended";
        this.registdataIndex++;
        }else if (this.NumcurrentYear==this.NumleaveYear && this.NumcurrentMonth==this.NumleaveMonth && this.NumcurrentDay>=this.NumleaveDay) 
      {
        this.registdata[this.registdataIndex].alertColor="";         
        this.registdata[this.registdataIndex].alertMsg=""; 
        this.registdata[this.registdataIndex].alertColor="alert-danger";         
        this.registdata[this.registdataIndex].alertMsg="extended";
        this.registdataIndex++;
        }

      // the check of reservation waiting code 
      if (this.NumcurrentYear<this.NumArriveYear) 
      {
        this.registdata[this.registdataIndex].alertColor="";         
        this.registdata[this.registdataIndex].alertMsg="";
        this.registdata[this.registdataIndex].alertColor="alert-warning";         
        this.registdata[this.registdataIndex].alertMsg="waiting"; 
        this.registdataIndex++;
        }
      else if (this.NumcurrentYear==this.NumArriveYear && this.NumcurrentMonth<this.NumArriveMonth)
      {
        this.registdata[this.registdataIndex].alertColor="";         
        this.registdata[this.registdataIndex].alertMsg="";
        this.registdata[this.registdataIndex].alertColor="alert-warning";         
        this.registdata[this.registdataIndex].alertMsg="waiting"; 
        this.registdataIndex++;     
        } 
      else if (this.NumcurrentYear==this.NumArriveYear && this.NumcurrentMonth==this.NumArriveMonth) 
      {
        if(this.NumcurrentDay<this.NumArriveDay){
          this.registdata[this.registdataIndex].alertColor="";         
          this.registdata[this.registdataIndex].alertMsg="";
          this.registdata[this.registdataIndex].alertColor="alert-warning";         
          this.registdata[this.registdataIndex].alertMsg="waiting";
          this.registdataIndex++;     
        }
        else{
        this.registdata[this.registdataIndex].alertColor="";         
        this.registdata[this.registdataIndex].alertMsg="";
        this.registdata[this.registdataIndex].alertColor="alert-success";         
        this.registdata[this.registdataIndex].alertMsg="existing";
        this.registdataIndex++;
        }
      }
    }
        
  }
}
