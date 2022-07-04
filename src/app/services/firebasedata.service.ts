import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

AngularFireModule
@Injectable({
  providedIn: 'root'
})
export class FirebasedataService {

  constructor(private datastore:AngularFirestore) { }

  data(){
    this.datastore.collection("data").snapshotChanges();
  }
  setComment(){
    this.datastore.collection("comment").snapshotChanges();
  }
}
