import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { interval, startWith, switchMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AddictionService } from 'src/app/services/addiction.service';
import { NotesService } from 'src/app/services/notes.service';
import { ReasonsService } from 'src/app/services/reasons.service';
import { RelapsesService } from 'src/app/services/relapses.service';

@Component({
  selector: 'app-view-addiction',
  templateUrl: './view-addiction.page.html',
  styleUrls: ['./view-addiction.page.scss'],
})
export class ViewAddictionPage implements OnInit {

  state: any = {};
  habit: any;
  relapses: any = [];
  
  relapsesCalendar: any = undefined;

  lastReasonText: string = '';

  constructor(
    private navCrtl: NavController,
    private router: Router,
    private notesService: NotesService,
    private addictionService: AddictionService,
    private loadingController: LoadingController,
    private appComponent: AppComponent,
    private relapsesService: RelapsesService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private reasonsService: ReasonsService
  ) { 

    const navig = this.router.getCurrentNavigation();
    this.state = navig?.extras?.state || {};
    this.habit = this.state.selectedHabit;

  }

  ngOnInit() {

    this.load();

    this.formatElapsedTime(this.findMostRecentDate());

    interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => {
          this.formatElapsedTime(this.findMostRecentDate());
          return interval(1000); 
        })
      )
      .subscribe();

  }

  async load(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Carregando . . .' });
    await loading.present();

    this.relapsesService.getRelapses(this.habit.id).subscribe({
      next: (data: any) => {
        this.relapses = data;
        this.attributeRelapses();
      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });

    await loading.present();

    this.reasonsService.getAll(this.habit.id).subscribe({
      next: (data: any) => {
        this.lastReasonText = data[data.length-1].texto;
      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });

  }

  public openEdit(): void {
    this.navCtrl.navigateRoot('/edit', {
      skipLocationChange: true,
      state: {selectedHabit: this.habit}
    });
  }

  async attributeRelapses(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Verificando recaidas . . .' });
    await loading.present();

    this.relapsesCalendar = [];

    this.relapsesCalendar.push({
      date: this.habit.data_abs.slice(0, 10),
      textColor: '#fff',
      backgroundColor: '#D94343',
    });

    this.relapses.forEach((relapse: any) => {
      this.relapsesCalendar.push({
        date: relapse.data_rec.slice(0, 10),
        textColor: '#fff',
        backgroundColor: '#D94343',
      });
    });

    console.log(this.findMostRecentDate());
    this.timeForNextGoal();

    loading.dismiss();

  }

  lastDate(): string {
    const habitDate = new Date(this.habit.data_abs);
    
    if (this.relapses.length === 0) {
      return this.formatDate(habitDate);
    }
  
    const recentDate = this.relapses.reduce((acc: any, relapse: any) => {
      const relapseDate = new Date(relapse.data_rec);
      return relapseDate > acc ? relapseDate : acc;
    }, new Date(this.relapses[0].data_rec));

    if (recentDate > habitDate) {
      return this.formatDate(recentDate);
    } else {
      return this.formatDate(habitDate);
    }
  }
  
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  }  

  findMostRecentDate() {
    let mostRecentDate = new Date(this.habit.data_abs);
  
    for (const relapse of this.relapses) {
      const relapseDate = new Date(relapse.data_rec);
      if (relapseDate > mostRecentDate) {
        mostRecentDate = relapseDate;
      }
    }
  
    return mostRecentDate;
  }

  timeForNextGoal() {
    const goals: number[] = [1, 2, 5, 7, 15, 30, 50, 80];
    const mostRecentDate = this.findMostRecentDate();
    const currentDate = new Date();
  
    const differenceInMilliseconds = currentDate.getTime() - mostRecentDate.getTime();

    // Cálculos para dias, horas, minutos e segundos
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;

    // Calcular dias
    const days = Math.floor(differenceInMilliseconds / millisecondsPerDay);
    const remainderAfterDays = differenceInMilliseconds % millisecondsPerDay;

    // Calcular horas
    const hours = Math.floor(remainderAfterDays / millisecondsPerHour);
    const remainderAfterHours = remainderAfterDays % millisecondsPerHour;

    // Calcular minutos
    const minutes = Math.floor(remainderAfterHours / millisecondsPerMinute);
    const remainderAfterMinutes = remainderAfterHours % millisecondsPerMinute;

    // Calcular segundos
    const seconds = Math.floor(remainderAfterMinutes / millisecondsPerSecond);

    const nextGoal = goals.filter((goal: any) => days < goal)[0];

    if (nextGoal !== undefined) {
      // Calcular o tempo restante até o próximo objetivo
      const daysRemaining = nextGoal - days;
      // Construir a string de retorno
      const formattedTime = [];
  
      if (daysRemaining > 0) {
        formattedTime.push(`${daysRemaining} d`);
      }
  
      return formattedTime.join(' e ');
    } else {
      return 'Nenhum objetivo futuro definido.';
    }

  }  

  formatElapsedTime(date: Date): string {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime(); // Obtém a diferença em milissegundos
  
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = 60 * millisecondsInSecond;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;
  
    const days = Math.floor(timeDifference / millisecondsInDay);
    const remainingTime = timeDifference % millisecondsInDay;
  
    const hours = Math.floor(remainingTime / millisecondsInHour);
    const remainingTime2 = remainingTime % millisecondsInHour;
  
    const minutes = Math.floor(remainingTime2 / millisecondsInMinute);
    const seconds = Math.floor(remainingTime2 % millisecondsInMinute / millisecondsInSecond);
  
    const formattedTime = [];
  
    if (days > 0) {
      formattedTime.push(`${days} d`);
    }
    if (hours > 0) {
      formattedTime.push(`${hours} h`);
    }
    if (minutes > 0) {
      formattedTime.push(`${minutes} min`);
    }
    if (seconds > 0) {
      formattedTime.push(`${seconds} sec`);
    }
  
    return formattedTime.join(' e ');
  }
  
  onBack(): void {
    this.navCrtl.navigateRoot('/tabs/home');
  }

  totalTime(): { number: number; unit: string } {
    const dateNow = new Date();
    const dateAbsString = this.findMostRecentDate();
  
    if (!dateAbsString) {
      return { number: 0, unit: 'horas' };
    }
  
    const dateAbs = new Date(dateAbsString);
  
    if (isNaN(dateAbs.getTime())) {
      return { number: 0, unit: 'horas' };
    }
  
    const timeDifference = dateNow.getTime() - dateAbs.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
  
    if (hoursDifference >= 24) {
      const daysDifference = Math.floor(hoursDifference / 24);
      return { number: daysDifference, unit: 'dias' };
    } else if (hoursDifference >= 1) {
      return { number: Math.floor(hoursDifference), unit: 'horas' };
    } else {
      return { number: 0, unit: 'horas' };
    }
  }

  async restartTimer(): Promise<void> {
    
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja realmente cadastrar uma recaida?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: async () => {
            const loading = await this.loadingController.create({ message: 'Carregando . . .' });
            await loading.present();

            const dateNow = new Date();
            this.relapsesService.createRelapse({ data_rec: dateNow.toJSON() }, this.habit.id).subscribe({
              next: (data: any) => {
                this.relapses.push({
                  data_rec: dateNow.toJSON().slice(0, 10),
                  textColor: '#fff',
                  backgroundColor: '#D94343',
                });
                this.attributeRelapses();
              },
              error: (error: any) => console.error(error),
              complete: () => loading.dismiss()
            });
          }
        }
      ]
    });
  
    await alert.present();

  }

  async deleteHabit(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      message: 'Deseja realmente excluir este vício?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          handler: async () => {
            const loading = await this.loadingController.create({ message: 'Deletando . . .' });
            await loading.present();

            this.addictionService.deleteUserHabit(this.habit.id).subscribe({
              next: (data: any) => {
                console.log(data);
                this.navCrtl.navigateForward('/tabs');
                this.appComponent.presentAlert('Sucesso!', '', 'Vício/Hábito excluído com sucesso!');
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

  viewReasons(): void {

    this.navCtrl.navigateRoot('/reason', {
      skipLocationChange: true,
      state: {selectedHabit: this.habit}
    });
    
  }

}
