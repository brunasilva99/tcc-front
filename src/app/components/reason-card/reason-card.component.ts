import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { ReasonsService } from 'src/app/services/reasons.service';

@Component({
  selector: 'app-reason-card',
  templateUrl: './reason-card.component.html',
  styleUrls: ['./reason-card.component.scss'],
})
export class ReasonCardComponent  implements OnInit {

  @Input() text!: string;
  @Input() id!: number;

  @Output() onEdit: EventEmitter<any> = new EventEmitter;
  @Output() onDelete: EventEmitter<any> = new EventEmitter;

  alertButtons = [
    {
      text: 'Voltar',
      role: 'cancel'
    },
    {
      text: 'Ok',
      role: 'confirm',
      handler: async (data: any) => {

        if (data.reason === '' || data.reason === undefined || data.reason === null) {
          this.appComponent.toastDanger('Motivo não inserido!');
        } else {

          const loading = await this.loadingController.create({ message: 'Editando . . .' });
          await loading.present();

          this.reasonsService.edit({ id: this.id, texto: data.reason }).subscribe({
            next: () => {
              this.onEdit.emit();
            },
            error: (err: any) => console.error(err),
            complete: () => loading.dismiss()
          });

        }
        
      }
    }
  ];
  alertInputs = [
    {
      type: 'textarea',
      placeholder: 'Escreva o motivo',
      name: 'reason',
      value: this.text
    },
  ];

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private reasonsService: ReasonsService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {}

  async deleteReason(): Promise<void> {

    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja mesmo excluir este motivo? Esta ação não tem volta!',
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel'
        }, {
          text: 'Confirmar',
          handler: async () => {
            
            const loading = await this.loadingController.create({ message: 'Excluindo . . .' });
            await loading.present();

            this.reasonsService.delete(this.id).subscribe({
              next: (data: any) => {
                console.log(data);
                this.onDelete.emit(this.id);
              },
              error: (err: any) => console.error(err),
              complete: () => loading.dismiss() 
            });

          }
        }
      ]
    });
  
    await alert.present();

  }

  async editReason(): Promise<void> {
    
  }

}
