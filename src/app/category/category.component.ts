import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { registdata } from '../registdata.interface';
import { FirebasedataService } from '../services/firebasedata.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private datastore:AngularFirestore , private dataSevice:FirebasedataService) { }

  registdata:registdata[];

  ngOnInit(): void {
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
  })
  }

  
}
