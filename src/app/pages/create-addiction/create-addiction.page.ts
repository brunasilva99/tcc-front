import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { AddictionService } from 'src/app/services/addiction.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-create-addiction',
  templateUrl: './create-addiction.page.html',
  styleUrls: ['./create-addiction.page.scss'],
})
export class CreateAddictionPage implements OnInit {

  state: any = {};
  habit: any;

  screen: 'name' | 'date' | 'reason' = 'date';

  dateNow = new Date();
  selectedDate: any = undefined;
  showCalendar: boolean = false;

  reason: string = '';

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private addictionService: AddictionService,
    private navCtrl: NavController,
    private notesService: NotesService
  ) { 

    const navig = this.router.getCurrentNavigation();
    this.state = navig?.extras?.state || {};
    this.habit = this.state.selectedHabit;

  }

  ngOnInit(): void {

    if (this.habit.nome === 'Outro') {
      this.habit.nome = undefined;
      this.screen = 'name';
    }

  }

  onConfirmDate(ev: any): void {

    this.showCalendar = false;
  
    this.selectedDate = ev;

  }

  onCancelDate(): void {

    this.showCalendar = false;

  }

  formateDateTime(dateTime: string): string {

    return `${dateTime.slice(8, 10)}/${dateTime.slice(5, 7)}/${dateTime.slice(0, 4)} às ${dateTime.slice(11, dateTime.length)}`;

  }

  async saveHabit(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Registrando vício' });
    await loading.present();

    this.addictionService.saveUserHabit({ id_vicio: this.habit.id, data_abs: this.selectedDate }).subscribe({
      next: (data: any) => {

        if (this.reason !== '') {
          this.saveReason();
        } else this.navCtrl.navigateRoot('/tabs');

      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });

  }

  async saveReason(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Salvando motivo . . .' });
    await loading.present();

    this.addictionService.getUserHabits().subscribe({
      next: (data: any) => {
        const newHabit = data.filter((aux: any) => aux.nome === this.habit.nome)[0];
        this.notesService.createReason({ texto: this.reason }, newHabit.id).subscribe({
          next: (lastData: any) => {
            this.navCtrl.navigateRoot('/tabs');
          },
          error: (lastError: any) => console.error(lastError),
          complete: () => loading.dismiss()
        });
      },
      error: (errorGet: any) => console.error(errorGet)
    });

  }

  onBack(): void {

    switch (this.screen) {

      case 'name':
        this.navCtrl.navigateRoot('/tabs/home');
      break;

      case 'date':
        if (this.habit.nome === 'Outro') {
          this.screen = 'name';
        } else this.navCtrl.navigateRoot('/tabs/home');
      break;

      case 'reason':
        this.screen = 'date';
      break;

    }

  }

  async onNext(): Promise<void> {

    if (this.screen === 'name') {

      const loading = await this.loadingController.create({ message: 'Cadastrando vício . . .' });
      await loading.present();

      this.addictionService.saveStandardsHabits({ nome: this.habit.nome, icone: this.habit.icone }).subscribe({
        next: () => {
          
          this.addictionService.getStandardsHabits().subscribe({
            next: (data: any) => {
              const newHabit = data.filter((aux: any) => aux.nome === this.habit.nome)[0];
              this.habit.id = newHabit.id;

              this.screen = 'date';
            },
            error: (error: any) => console.error(error),
            complete: () => loading.dismiss()
          });

        },
        error: (err: any) => console.error(err)
      });

    } else this.screen = 'reason';

  }

}
