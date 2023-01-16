import { doc } from '@angular/fire/firestore';
import { InfoService } from '../../services/info.service';
import { Component, OnInit } from '@angular/core';
import Info from '../../interfaces/infor.interface';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { info } from 'console';
import { Firestore } from '@angular/fire/firestore';




@Component({
  selector: 'app-list-reg',
  templateUrl: './list-reg.page.html',
  styleUrls: ['./list-reg.page.scss'],
})
export class ListRegPage implements OnInit {


 


data:Info[] = [];
  loadingController: any;
  constructor(private infoService:InfoService, private alertController: AlertController, private router: Router,  private firestore: Firestore ) { 
    this.getInfo();
    

  }

  ngOnInit(): void{
    this.getInfo();
   



    }


    getInfo(){
      this.infoService.getInfo().subscribe(infor=> {
       
        this.data = infor;
        console.log(this.data);

      }
      );
    }


    async deleteInfo(info: Info) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta',
        message: '<strong>Desea eliminar el registro?</strong>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Si',
            handler: () => {
              this.infoService.deleteInfo(info);
              console.log('Confirmar');
            }
          }

        ]
      });

      await alert.present();

    }

    async nuevoRegistro() {
      this.router.navigate (['/create-reg']);
    }

    


    //Modal


    isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //update

 
  //id
  

     

 

  
   


   



}
