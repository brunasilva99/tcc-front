import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-configs',
  templateUrl: 'configs.page.html',
  styleUrls: ['configs.page.scss']
})
export class ConfigsPage implements OnInit {

  public darkMode = false;

  constructor(
    private appComponent: AppComponent
  ) {}

  public ngOnInit(): void {

    this.darkMode = this.appComponent.darkMode;

    this.checkAppMode();
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

  public openMail(): void {
    const email = "suporte@hotmail.com";
    const emailUrl = `mailto:${email}`;

    if (window.open(emailUrl, '_system')) {
      console.log('Email aberto com sucesso!');
    } else {
      console.error('O dispositivo não pode abrir o app de email!');
    }
  }

}
