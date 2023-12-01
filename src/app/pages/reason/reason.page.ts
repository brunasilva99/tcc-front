import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { ReasonsService } from 'src/app/services/reasons.service';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.page.html',
  styleUrls: ['./reason.page.scss'],
})
export class ReasonPage implements OnInit {

  state: any = {};
  habit: any;

  reasons: any = [];

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

          const loading = await this.loadingController.create({ message: 'Cadastrando . . .' });
          await loading.present();

          this.reasonsService.add(this.habit.id, data.reason).subscribe({
            next: () => {
              this.load();
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
      name: 'reason'
    },
  ];

  constructor(
    private router: Router,
    private reasonsService: ReasonsService,
    private loadingController: LoadingController,
    private appComponent: AppComponent,
    private navCtrl: NavController,
  ) { 

    const navig = this.router.getCurrentNavigation();
    this.state = navig?.extras?.state || {};
    this.habit = this.state.selectedHabit;

  }

  ngOnInit(): void {
    this.load();
  }

  async load(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Carregando . . .' });
    await loading.present();

    this.reasonsService.getAll(this.habit.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.reasons = data;
        console.log(this.reasons);
      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });

  }

  backPage() {
    this.navCtrl.navigateRoot('/view-addiction', {
      skipLocationChange: true,
      state: {selectedHabit: this.habit}
    });
  }

}
