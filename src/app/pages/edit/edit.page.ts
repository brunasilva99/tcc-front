import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AddictionService } from 'src/app/services/addiction.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  state: any = {};
  habit: any;
  standardhabit: any;

  showCalendar: boolean = false;

  public alertButtons = [
    {
      text: 'Voltar',
      role: 'cancel'
    },
    {
      text: 'Ok',
      role: 'confirm',
      handler: async (data: any) => {

        if (data.name === '' || data.name === undefined) {
          this.appComponent.toastDanger('Nome não alterado!');
        } else {

          const loading = await this.loadingController.create({ message: 'Cadastrando . . .' });
          await loading.present();

          this.addictionService.editStandardHabits({ nome: data.name, icone: this.habit.icone }, this.standardhabit.id).subscribe({
            next: (resp: any) => {
              console.log(resp);
              this.load();
            },
            error: (err: any) => console.error(err),
            complete: () => loading.dismiss()
          });

        }
        
      }
    }
  ];
  public alertInputs = [
    {
      placeholder: 'Nome do hábito',
      type: 'text',
      name: 'name'
    }
  ];

  constructor(
    private router: Router,
    private addictionService: AddictionService,
    private loadingController: LoadingController,
    private appComponent: AppComponent
  ) { 
    const navig = this.router.getCurrentNavigation();
    this.state = navig?.extras?.state || {};
    this.habit = this.state.selectedHabit;
  }

  ngOnInit() {
    this.load();
  }

  public async load(): Promise<void> {

    const loading = await this.loadingController.create({ message: 'Carregando . . .' });
    await loading.present();

    this.addictionService.getStandardsHabits().subscribe({
      next: (data: any) => {
        console.log(data);
        this.standardhabit = data.filter((aux: any) => aux.nome === this.habit.nome)[0];
        console.log(this.standardhabit);
      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });

  }

  async setDate(ev: any): Promise<void> {
    console.log(ev);

    const loading = await this.loadingController.create({ message: 'Alterando data . . .' });
    await loading.present();

    this.addictionService.editUserHabit({ id: this.habit.id, data_abs: ev }).subscribe({
      next: (data: any) => {
        this.appComponent.presentAlert('Sucesso!', '', 'Data alterada com sucesso!');
        this.showCalendar = false;
      },
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    });
  }

  async updateIcon(ev: string): Promise<void> {
    const loading = await this.loadingController.create({ message: 'Mudando ícone . . .' });
    await loading.present();

    this.habit.icone = ev;

    this.addictionService.editStandardHabits({ nome: this.habit.nome, icone: ev }, this.standardhabit.id).subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.error(err),
      complete: () => loading.dismiss()
    })
  }

  public onBack(): void {
    this.router.navigate(['/']);
  }

}
