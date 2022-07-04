import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { registdata } from '../registdata.interface';

AngularFirestore
@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss']
})
export class RegistComponent implements OnInit {

  constructor( private setdata:AngularFirestore) { }
  
  registdata:registdata[];
  checkRooms:boolean=false;
  doc_count:number;
  char:string="";
  setdoc:string;

  ngOnInit(): void {
  //  this.setdata.collection("data2").doc(this.plus.toString()).set({
  //    name:"hello"
  //  })
  this.setdata.collection("data").snapshotChanges().subscribe(data =>{
    this.registdata=data.map(element =>{
      return{
        docId:element.payload.doc.id
        }
      })
    })
}

  errorMsg:string;
  successMsg:string;
  single:string;
  double:string;
  

  setsingle(){
    this.single="single room";
    this.double="";
  }

  setdouble(){
    this.single="";
    this.double="double room";
  }

 regist(form){
   let data=form.value;
  console.log(data);
  console.log("num docs "+this.registdata.length);

   if(data.dateleave>data.dateArrive && data.email!="" && data.phone!="" && data.name!=""){
    // if(data.dateleave>data.dateArrive && data.email!="" && data.phone!="" && data.name!=""&&this.registdata.length<10){
    // this.successMsg="Booked successfully , we will call you for more information ";
    this.errorMsg="";
    console.log("welcome to porto");

    if(this.registdata.length==0){
      this.doc_count=0;
      this.char="a";
      this.setdoc=this.char+this.doc_count.toString()
    }else{
      let getid=this.registdata[this.registdata.length-1].docId;
      let char="";

      if(parseInt(getid[getid.length-1])<9){
        this.doc_count=parseInt(getid[getid.length-1]) ;
        this.doc_count++;
        for(let i=0 ; i<=getid.length-2 ; i++){
          char+=getid[i];
        }
        this.setdoc=char+this.doc_count.toString()
        // console.log(char)
        // console.log(this.doc_count)
        // console.log(parseInt(getid[getid.length-1]))
        // console.log(this.setdoc)
      }
      else{
        this.doc_count=0;
        for(let i=0 ; i<=getid.length-2 ; i++){
          char+=getid[i];
        }
        char+="a";
        this.setdoc=char+this.doc_count.toString();
        // console.log(this.setdoc)

      }
    }

    this.checkRooms=false;
    // this.plus=this.registdata.length;
    // this.plus++;
    this.setdata.collection("data").doc(this.setdoc).set({
      email:data.email,
      name:data.name,
      phone:data.phone,
      Doubleroom:this.double,
      Singleroom:this.single,
      dateArrive:data.dateArrive,
      dateleave:data.dateleave
    })
    .then(()=>{
      this.successMsg="Booked successfully , we will call you for more information ";
      this.errorMsg="";
      this.checkRooms=false;
    }).catch(()=>{
      this.errorMsg="Please cheack your data entered";
      this.successMsg="";
    })
   }else{
    this.errorMsg="Please cheack your data entered";
    this.successMsg="";
   }

   // this.setdata.collection("data").add({
    //   email:data.email,
    //   name:data.name,
    //   phone:data.phone,
    //   Doubleroom:this.double,
    //   Singleroom:this.single,
    //   dateArrive:data.dateArrive,
    //   dateleave:data.dateleave
    // })
 }
}
