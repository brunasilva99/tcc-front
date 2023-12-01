import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public darkMode: boolean = false;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.checkAppMode();
  }

  async toastDanger(text: string): Promise<void> {
    const toast = await this.toastController.create({
      position: 'top',
      message: text,
      duration: 2000,
      icon: 'information-circle',
      cssClass: 'dangerToast'
    });
    
    toast.present();
  }

  async presentAlert(header: string, subHeader: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  public async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }

  public toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({key: 'darkModeActivated', value: 'true'});
    } else {
      // localStorage.setItem('darkModeActivated', 'false');
      Preferences.set({key: 'darkModeActivated', value: 'false'});
    }
  }

}
