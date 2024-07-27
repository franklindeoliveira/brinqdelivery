npx expo start	Starts the development server (whether you are using a development build or Expo Go).
npx expo prebuild	Generates native Android and iOS directories using Prebuild.
npx expo run:android	Compiles native Android app locally.
npx expo run:ios	Compiles native iOS app locally.
npx expo install package-name	Used to install a new library or validate and update specific libraries in your project by adding --fix option to this command.
npx expo lint	Setup and configures ESLint. If ESLint is already configured, this command will lint your project files.

setJava.bat
npx create-expo-app@latest
npx expo install expo-dev-client
npx expo prebuild --clean
npx expo prebuild
npx expo run:android
npx expo run:ios
npx expo start
eas build -p ios
eas build -p android --profile preview
eas build -p ios --profile preview

<meta-data android:name="com.google.android.geo.API_KEY" android:value="AIzaSyAAXo1KTSZM-2gRZUiH5mvnC123PB4DcJE" />

