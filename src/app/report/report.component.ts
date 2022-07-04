import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { comment } from 'src/coment.interfae';

AngularFirestore
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private makeComment:AngularFirestore) { }

  idcomments:comment[];
  doc_count:number;
  char:string="";
  setdoc:string;

  check:boolean=false;
  check2:boolean=false;


  ngOnInit(): void {
    this.makeComment.collection("comment").snapshotChanges().subscribe(data =>{
      this.idcomments=data.map(element =>{
        return{
          id:element.payload.doc.id
        }
      })
    })
  }

  msg:string="";
  setalerttrue:boolean=false;
  setalertfalse:boolean=false;
  
  setComment(userform){
    let data=userform.value;

      console.log(data);
      if(data.email=="" || data.comment=="" || data.email==" " || data.comment==" "){

        this.setalertfalse=true;

        this.setalerttrue=false;

        this.msg="Please check the data entered";

      }else{

        if(this.idcomments.length==0){
          this.doc_count=0;
          this.char="a";
          this.setdoc=this.char+this.doc_count.toString()
        }else{
          let getid=this.idcomments[this.idcomments.length-1].id;
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
            this.setdoc=char+this.doc_count.toString()
            // console.log(this.setdoc)
          }
        }

      //   
      this.makeComment.collection("comment").doc(this.setdoc).set({
        email:data.email,
        comment:data.comment
      }).then(()=>{

        this.setalerttrue=true;

        this.setalertfalse=false;

        this.msg="your message sended successfully";
      }).catch(()=>{
        this.setalertfalse=true;

        this.setalerttrue=false;
        
        this.msg="Please check the data entered";
      });


      // this.makeComment.collection("comment").add({
        //     email:data.email,
        //     comment:data.comment
        //   }).then(()=>{
        //     this.setalerttrue=true;
        //     this.setalertfalse=false;
        //     this.msg="your message sended successfully";
        //   }).catch(()=>{
        //     this.setalertfalse=true;
        //     this.setalerttrue=false;
        //     this.msg="Please check the data entered";
        //   });
        // }

    }
  }

  // check(){
  //   let getid=this.idcomments[this.idcomments.length-1].id;
  //   let char=""

  //   if(this.idcomments.length==0){
  //     this.doc_count=0;
  //     this.char="a";
  //     this.setdoc=this.char+this.doc_count.toString()
  //   }else{
  //     if(parseInt(getid[getid.length-1])<9){

  //       this.doc_count=parseInt(getid[getid.length-1]) ;
  //       this.doc_count++;
  //       for(let i=0 ; i<=getid.length-2 ; i++){
  //         char+=getid[i];
  //       }
  //       this.setdoc=char+this.doc_count.toString()
  //       // console.log(char)
  //       // console.log(this.doc_count)
  //       // console.log(parseInt(getid[getid.length-1]))
  //       // console.log(this.setdoc)
  //     }
  //     else{
  //       this.doc_count=0;
  //       for(let i=0 ; i<=getid.length-2 ; i++){
  //         char+=getid[i];
  //       }
  //       char+="a";
  //       this.setdoc=this.char+this.doc_count.toString()
  //       // console.log(this.setdoc)

  //     }
  //   }

  // }

  start(){
    this.check=true
  }
  start2(){
    this.check2=true
  }
}
