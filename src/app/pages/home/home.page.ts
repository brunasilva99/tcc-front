import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { LoadingController, NavController } from '@ionic/angular';
import { AddictionService } from 'src/app/services/addiction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  state: any = {};
  habits: any = [];

  updateList: boolean = false;

  constructor(
    private addictionService: AddictionService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private router: Router
  ) {
    
    const navig = this.router.getCurrentNavigation();
    this.state = navig?.extras?.state || {};
    this.updateList = this.state.updateList;

    if (this.updateList) this.load();

  }

  ngOnInit(): void {

    this.load();

  }

  async load(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Carregando . . .' });
    await loading.present();

    this.addictionService.getUserHabits().subscribe({
      next: (data: any) => {
        this.habits = data;
        console.log(this.habits);
        this.sendNotifications();
      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });

  }

  viewHabit(habit: any): void {

    this.navCtrl.navigateRoot('/view-addiction', {
      skipLocationChange: true,
      state: {selectedHabit: habit}
    });

  }

  async sendNotifications(): Promise<void> {

    LocalNotifications.checkPermissions();
    await LocalNotifications.requestPermissions();

    const options: ScheduleOptions = {
      notifications: []
    };

    const daysGoals = [1, 2, 5, 7, 15, 30, 50, 80, 100, 150, 200, 300];

    for (let i = 0; i < this.habits.length; i++) {
      const habit = this.habits[i];
      const daysAbsValue = this.daysAbs(habit.data_abs);

      if (daysGoals.includes(daysAbsValue)) {
        options.notifications.push({
          id: i + 1,
          title: 'Meta atingida!',
          body: '',
          largeBody: `Parabéns! você esta sem ${habit.nome} por ${daysAbsValue} dias! continue assim.`,
          summaryText: 'Meta alcançada!'
        });
      }
    }

    if (options.notifications.length > 0) {
      try {
        await LocalNotifications.schedule(options);
      } catch (e) {
        console.log(e);
      }
    }
  }

  daysAbs(timeAbs: string): number {
    const dateNow = new Date();
    const dateAbs = new Date(timeAbs);
  
    const timeDifference = dateNow.getTime() - dateAbs.getTime();
    const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }

}
