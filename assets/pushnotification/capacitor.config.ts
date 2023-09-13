import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pushnotification.app',
  appName: 'pushnotification',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
