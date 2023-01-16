import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, NumericValueAccessor } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';


import {Geolocation} from '@capacitor/geolocation';
import { Auth } from '@angular/fire/auth';


import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { InfoService } from '../services/info.service';



import { doc, docData, Firestore, updateDoc, setDoc, collection } from '@angular/fire/firestore';

import Info from '../interfaces/infor.interface';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public formulario: FormGroup;
	profile = null;
  lat :any;
  lng :any;
  infor:Info[];
  user = this.auth.currentUser;
  date = new Date();


  ngOnInit(): void {

    const user = this.auth.currentUser;

    this.infoService.getInfo().subscribe(infor=> {
      console.log(infor);
      

      
    }
   
    
    );

    
}


	constructor(
		private avatarService: AvatarService,
		private authService: AuthService,
		private router: Router,

		private loadingController: LoadingController,
    private firestore: Firestore,
    private auth: Auth,
    private infoService: InfoService,
    private FormBuilder: FormBuilder,


		private alertController: AlertController
	) {
		


    this.formulario = new FormGroup({
        name: new FormControl(),
        lastname: new FormControl(),
        cedula: new FormControl(),
        number: new FormControl(),
        lat: new FormControl( {value: this.lat, disabled: true}),
        lng: new FormControl( {value: this.lng, disabled: true}),
        user: new FormControl({value: this.user.email, disabled: true}), 
        date: new FormControl({value: this.date, disabled: true}),
        
       
        //image: new FormControl()
      });
	}

  getUserProfile() {
		const user = this.auth.currentUser;
		const userDocRef = doc(this.firestore, `${user.uid}`);
		return docData(userDocRef, { idField: 'id' });
    
	}
  async onSubmit() {
    const loading = await this.loadingController.create();
    await loading.present();
    
   
      
      const user = this.auth.currentUser;
    
      const coordinates = await Geolocation.getCurrentPosition();
      
      this.formulario.value.user =  user.displayName;
      
      this.formulario.value.date = this.date;
        
      const {formulario} = this.formulario.value;
       await this.infoService.addInfo(this.formulario.value).then(() => {
        console.log('Informacion agregada');
        this.router.navigate (['/']);
        });
       
      
       await loading.dismiss().then(() => {
        this.formulario.reset();
       
      });
      
      
      

        

       

    

     
      

      
     
      
    }
    
 
    
  




  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `coord/collection${user.uid}`);
    await setDoc(userDocRef, {
      lat: this.lat,
      lng: this.lng
    });
    

  }

  async onClickDelete(info : Info) {
    const response = await this.infoService.deleteInfo(info);
    console.log(response);
  }


  /* async sendInfo(name, lastname, id, number) {


    if(name == "" || lastname == "" || id== ""||number== "" ) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Debe ingresar todos los parametros para continuar',
        buttons: ['OK']
      });
      await alert.present();
    }
    else {

      const user = this.auth.currentUser;
      const userDocRef = collection(this.firestore, `datos/${user.uid}`.replace(/\s/g, ''));
        return addDoc (userDocRef, {

          name: name,
          lastname: lastname,
          id: id,
          number: number
        });


      return alert('Información guardada');


    }



    name = "";
    lastname = "";
    id = "";
    number = "";






  }*/




	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

}


