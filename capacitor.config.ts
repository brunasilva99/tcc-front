import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vidanova.app',
  appName: 'Vida Nova',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "./src/assets/svg-icons/icon.svg",
      iconColor: "#ffffff",
    }
  }
};

export default config;
