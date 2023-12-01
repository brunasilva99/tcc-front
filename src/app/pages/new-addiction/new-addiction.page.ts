import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AddictionService } from 'src/app/services/addiction.service';

@Component({
  selector: 'app-new-addiction',
  templateUrl: './new-addiction.page.html',
  styleUrls: ['./new-addiction.page.scss'],
})
export class NewAddictionPage implements OnInit {

  standardsHabits: any = [];
  userHabits: any = [];

  constructor(
    private addictionService: AddictionService,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) { }

  ngOnInit(): void {

    this.load();

  }

  async load(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Carregando . . .' });
    await loading.present();

    this.addictionService.getStandardsHabits().subscribe({
      next: (data: any) => {
        this.standardsHabits = data;

        this.addictionService.getUserHabits().subscribe({
          next: (userData: any) => {
            this.userHabits = userData;

            this.userHabits.forEach((aux: any) => this.standardsHabits = this.standardsHabits.filter((obj: any) => obj.nome !== aux.nome));
          },
          error: (userError: any) => console.error(userError),
          complete: () => loading.dismiss()
        });

      },
      error: (err: any) => console.error(err)
    });

  }

  openCreatePage(habit: any): void {
    
    this.navCtrl.navigateForward('/create-addiction', {
      skipLocationChange: true,
      state: {selectedHabit: habit}
    });

  }

}
