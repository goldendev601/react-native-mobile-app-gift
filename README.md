# GiftD

This project was built with React native and Expo.

## Main Features

* Authentication(login, sign up) 
* CRUD (contact, event, gift, etc)
* Stripe connection
* Custom component(for giftd cards)
* Payment integration(CC card and bank payment method)
* Modal
* Opening external links in browser
* Deeplinking
* Navigation(Home, event, profile, contact)
* Get some infos from the phone device (get contacts from the phone, get photos from album folder of the device)
* Email notification (When giftd sent and new transaction is happened)

## API

* Staging API: `https://stagingapi.givegiftd.com`
* Production API: `https://api.givegiftd.com`

You can set an API url in `contants/Api.ts`

## How to get started

1. Install latest version of Node.js

2. Install Expo CLI and yarn package.

* `$ npm install --global expo-cli`
* `$ npm install --global yarn`

3. Install all dependencies for the project.

* `$ npm install --global expo-cli`
* `$ npm install --global yarn`

4. Run with Expo CLI.

* `$ expo login`
* `$ expo start [--tunnel]`

## How to deploy

#### For IOS

* Build an IPA file `expo build:ios`
* Upload IPA file to the testflight
* Publish to the App Store

#### For Android

* Build an APK file `expo build:android` 

## Other

* Version: 4.2.2
* Bundle ID: com.givegiftd.giftd 
