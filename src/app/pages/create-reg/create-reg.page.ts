import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, NumericValueAccessor } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AvatarService } from '../../services/avatar.service';
import { getDownloadURL, ref, Storage, uploadBytes, uploadString } from '@angular/fire/storage';

import {Geolocation} from '@capacitor/geolocation';
import { Auth } from '@angular/fire/auth';


import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InfoService } from '../../services/info.service';



import { doc, docData, Firestore, updateDoc, setDoc, collection,  } from '@angular/fire/firestore';

import Info from '../../interfaces/infor.interface';
import { info } from 'console';



@Component({
	selector: 'app-create',
	templateUrl: 'create-reg.page.html',
	styleUrls: ['create-reg.page.scss']
})
export class CreateRegPage implements OnInit {

  public formulario: FormGroup;
	profile = null;
  lat :any;
  lng :any;
  infor:Info[];
  user = this.auth.currentUser;
  date = new Date();
  id : string | null;
  text = 'Agregar';


  idi : string;





  ngOnInit() {

    this.updateInfo();





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
    private storage: Storage,
    private aRoute : ActivatedRoute,


		private alertController: AlertController
	) {
		
    
    this.formulario = this.FormBuilder.group({
      materia: ['', Validators.required],
      docente: ['', Validators.required],
      aula: ['', Validators.required],
      horas: ['', Validators.required],
      user: new FormControl({value: this.user.email, disabled: true}),
        date: new FormControl({value: this.date, disabled: true}),
     
    });



   
       


        //image: new FormControl()
 

      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id);
      this.idi = this.aRoute.snapshot.paramMap.get('id');


	}

  
  

  getUserProfile() {
		const user = this.auth.currentUser;
		const userDocRef = doc(this.firestore, `${user.uid}`);
		return docData(userDocRef, { idField: 'id' });

	}

async onSubmitEdit() {

 

  if (this.formulario.invalid) {
    return;
  }

  if (this.id == null) {
    this.onSubmit();
    alert('Registro agregado correctamente');
  }else {
    this.editarInfo();
   
  }

}


  async onSubmit() {
    const loading = await this.loadingController.create();
    const user = this.auth.currentUser;
      this.formulario.value.user =  user.email;
      this.formulario.value.date = this.date.getDate() + "/" + (this.date.getMonth() +1) + "/" + this.date.getFullYear();
      const {formulario} = this.formulario.value;
      try{
        if(this.formulario.value.materia== "" || this.formulario.value.docente == "" ||this.formulario.value.aula== "" || this.formulario.value.horas== "" ) {
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Debe ingresar todos los parametros para continuar',
          buttons: ['OK']
        });
      }
        else{
       await this.infoService.addInfo(this.formulario.value).then(() => {
      

        console.log(this.formulario);


        loading.dismiss().then(() => {
          this.formulario.reset();
          

        });
        this.router.navigate (['/list-reg']);
        });
      }
      } catch (error) {




        console.error(error);
      }



















    }








 
	async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

data = null;

  editarInfo(){
    this.infoService.updateInfor(this.id, this.formulario.value).then(() => {
      alert('Registro actualizado correctamente');
      this.router.navigate(['/list-reg']);
    });
  }
	

  updateInfo(){
    if(this.id !== null){
      this.text = 'Actualizar';
      this.infoService.getInfo().subscribe(info =>{
        this.infor = info;
        this.infor.forEach(element => {
          console.log(this.id);
          if(element.id == this.id){
            this.formulario.setValue({
              materia: element.materia,
              docente: element.docente,
              aula: element.aula,
              horas: element.horas,
              user: element.user,
              date: element.date,
              
            })
          }
       

        });
        
      });
    }
  }

  
  async verList() {
    this.router.navigate (['/list-reg']);
  }
	

  


 




}


