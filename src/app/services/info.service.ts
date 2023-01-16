import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc, collection, addDoc, collectionData, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import Info from '../interfaces/infor.interface';





@Injectable({

providedIn: 'root'
})
export class InfoService {
  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage ) {}

addInfo (info: Info ) {
    const user = this.auth.currentUser;
		const storageRef = ref(this.storage);

    try{

   const userInfoRef = collection(this.firestore, `info`);
console.log(info.id);
    return addDoc(userInfoRef, info, );

  } catch (e) {
    return null;
  }





  }

  getInfo(): Observable<any> {

  const user = this.auth.currentUser;
  const userInfoRef = collection(this.firestore, `info`);
  return collectionData(userInfoRef, { idField: 'id' }) as Observable<Info[]>;
  


  }
  
 


  deleteInfo(info: Info) {
      const placeinfoRef = doc(this.firestore, `info/${info.id}`);
      
      return deleteDoc(placeinfoRef);
  }

getEditInfo(id: string): Observable<any> {
  const placeinfoRef = doc(this.firestore, `info/${id}`);
  return docData(placeinfoRef) as Observable<Info>;
}


updateInfor(id: string, info: any) {
  const placeinfoRef = doc(this.firestore, `info/${id}`);
  return updateDoc(placeinfoRef, info);


}


idInfo(info: Info) {
  const placeinfoRef = doc(this.firestore, `info/${info.id}`);
  
  return placeinfoRef;
}


}













