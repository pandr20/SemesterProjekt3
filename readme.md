## Follow the steps below to run the app

If the enviroment isn't already setup, follow the guide below to get started.

https://reactnative.dev/docs/environment-setup



Choose the **React Native CLI Quickstart** and then select your Development OS and Target OS.



After following guide till the end, you should now be ready to run the app. Also, make sure to install [yarn](https://yarnpkg.com/) as this is the package manager that is being used. This can be done with `Chocolatey` which should already be installed if you followed the guide. `choco install yarn`



#### After setting up the environment, you are now ready to run the app

First of all make sure you have the correct dependencies installed by running the following command:

```
yarn install
```

This command should be run every time you pull changes from `gitlab` or when you install a new module/package.

##### To run the app use the following command:

\- For android:

```
npx react-native run-android
```

\- For iOS:

```
npx react-native run-ios
```

