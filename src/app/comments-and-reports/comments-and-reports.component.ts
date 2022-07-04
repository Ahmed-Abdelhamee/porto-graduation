import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { comment } from 'src/coment.interfae';

@Component({
  selector: 'app-comments-and-reports',
  templateUrl: './comments-and-reports.component.html',
  styleUrls: ['./comments-and-reports.component.scss']
})
export class CommentsAndReportsComponent implements OnInit {

  constructor(private commentStore:AngularFirestore) { }

  comments:comment[];

  ngOnInit(): void {
    this.commentStore.collection("comment").snapshotChanges().subscribe(data =>{
      this.comments=data.map(element =>{
        return {
          
          email:element.payload.doc.data()["email"],
          comment:element.payload.doc.data()["comment"],
          id:element.payload.doc.id
        }
       
      });
    })
  }

  delete(del_id){
    this.commentStore.collection("comment").doc(del_id).delete();
  }
}
