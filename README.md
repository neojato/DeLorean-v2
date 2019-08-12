# DeLorean Project
## A GDG DevFest/IWD/Event Website Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) and utilizes [Firebase](https://firebase.google.com) for Database, Storage, and Hosting to create a fully functional and customizable template for your Google Developer Group's DevFest/IWD/Event. This project has been designed to continue to be your Event website solution without having to create a new site or Firebase project every year. Simply update the Firebase node in the config and the site resets awaiting your next year's Event data. All the while preserving your previous year's data in the same Firebase project.

## Live Demo
https://delorean-demo.firebaseapp.com/

## Features
 - Simple site config setup
 - Simple event schedule management
 - Simple sponsor management
 - Simple ticket management
 - Simple speaker management
 - Featured speakers section
 - Featured venue section
 - "My Schedule" for Attendees
 - Google Tag Manager enabled
 - Session feedback
 - Code of Conduct

## Table of Contents
 - [Getting Started](#getting-started)
 - [Contributing](#contributing)
 - [Development Server](#development-server)
 - [Managing Data](#managing-data)
 - [Build](#build)
 - [Deploy](#deploy)
 - [Profit!](#profit)

## Getting Started

1. Install Angular CLI (`npm install -g @angular/cli`).
1. Install Firebase Tools (`npm install -g firebase-tools`).
1. Clone this repository: `git clone https://github.com/neojato/DeLorean-v2.git`.
1. Run `npm install` from the project root.
1. Create a new [Firebase project](https://console.firebase.google.com) (if you don't have one already).
1. Grab a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) for your project.
   * Enable the Google Maps [Geocoding API](https://developers.google.com/maps/documentation/javascript/geocoding#GetStarted)
1. Run `firebase login` and then `firebase init` and link to your Firebase Project.
   * Select Database, Functions, and Hosting
   * Select your Firebase Project (created earlier)
   * Use default filename for Database Rules
   * Enter `N` when asked to overwrite Database Rules
   * Select `JavaScript` when asked for Cloud Functions language
   * Enter `Y` when asked to use ESLint
   * Enter `N` when asked to overwrite `functions/index.js`
   * Enter `Y` when asked to install dependancies
   * Type `dist` for your public directory
   * Respond yes to configure as a single-page app
1. Replace the generated `firebase.json` with the contents from [`firebase.json.template`](https://github.com/neojato/DeLorean-v2/blob/master/firebase.json.template)
1. Copy [`firebase.config.ts.template`](https://github.com/neojato/DeLorean-v2/blob/master/src/environments/firebase.config.ts.template) to `firebase.config.ts` and populate fields with your Firebase and Google Maps Keys.
   * Change the value for the `devfestYear` key to the current year
   * **NOTE:** Currently you will need modify this value annually to reuse this Firebase Project for your annual event
1. Update [`manifest.json`](https://github.com/neojato/DeLorean-v2/blob/master/src/manifest.json) with your Event's details to enable [Progressive Web App (PWA)](https://developers.google.com/web/progressive-web-apps/) capabilities.
   * (Optional) If you want to fully customize the PWA experience, you can easily generate the `manifest.json` & correctly sized app icons using this tool: [App Manifest Generator](https://app-manifest.firebaseapp.com/)

## Contributing

This project is open for contributions, suggestions, and ideas. Feel free to submit a PR and/or create an [Issue](https://github.com/neojato/DeLorean-v2/issues) with bugs, suggestions, and ideas. Stars are always welcome too!

See [list of contributors](https://github.com/neojato/DeLorean-v2/graphs/contributors).

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Managing Data

### Site Setup

1. From the Firebase Console, go to "Authentication" and enable the Google sign-in method.
1. Log into your site using your Google account.
1. From the Firebase Console, go to "Authentication" and copy the User UID for your email address.
1. From the Firebase Console, go to "Database", then "Real-Time Database" and create a parent node called `admins` then add your copied User UID as the key with a value of `true`.
1. (Optional) Replace `hero.png` and `devfest.png` with your own image for your Event or of Your City.

### Google Tag Manager Setup (Optional)

1. Create an Account and a Container on [Google Tag Manager](https://tagmanager.google.com).
1. Once created, you will receive the tracking snippet.
   * Replace each instance of `GTM-XXXXXXX` within `index.html` with your tracking ID following the same pattern.
1. Now you are able to create Tags for:
   * [Google Analytics](https://www.napkyn.com/2018/05/02/deploying-google-analytics-for-angular-5/)
   * [Facebook Pixel](https://www.facebook.com/business/help/1021909254506499)
   * [Custom HTML](https://support.google.com/tagmanager/answer/6107167)
   * And [many, many more](https://support.google.com/tagmanager/answer/6106924)!

### Site Config

1. Click the Profile dropdown in the navbar and select "Site Config" to fill out all the details for your Event.
* **NOTE:** The uploaded venue image is stored in Firebase Storage if you need to retrieve it later.

### Ticket Config

1. Click the Profile dropdown in the navbar and select "Ticket Config" to create ticket boxes to advertise levels available for purchase to your Event.
* **NOTE:** The tickets auto-appear in a section on the homepage but can only be managed from this admin page.

### Speaker Management

1. Click the "Speakers" link in the navbar and then click on the "Create Speaker" button to add a speaker.
1. Rinse and repeat for however many speakers you have for your Event.
1. Check the "Featured" option to have that speaker also display on the homepage in the "Featured Speakers" section.
* **NOTE:** The uploaded profile images get stored in Firebase Storage if you need to retrieve them later.

### Schedule Management

1. Click the "Schedule" link in the navbar and then click on the "Create Section" button to add a section.
   * This allows you to break your schedule into sections like "Breakouts - 10:00 AM" and "Lunch".
1. Click on the "Create Session" button to add a session.
* **NOTE:** It is **required** to have section(s) created in order for sessions to appear!
* **NOTE:** It is **recommended** to have added the speaker prior to adding their session.
* **NOTE:** You can Edit/Delete the session from the session's detail page.

### Sponsor Management

1. Click the "Sponsors" link in the navbar and then click on the "Create Level" button to add a level.
   * This allows you to break your sponsors into customized tiered levels like "Gold", "Silver", and "Bronze".
1. Click on the "Create Sponsor" button to add a sponsor.
* **NOTE:** It is **required** to have level(s) created in order for sponsors to appear!
* **NOTE:** The levels and sponsors auto-appear in a section on the homepage but can only be managed from the Sponsor page.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Run `npm run build-prod` to generate an optimized production build.

## Deploy

Run `npm run deploy` to generate an optimized production build and deploy the `dist/` directory to Firebase Hosting (along with Firebase Real-Time Database rules & Firebase Functions).

## Profit!

Congrats on launching your Event website!

### Who uses the template?

Please let me know if you used this template with a [Pull Request](https://github.com/neojato/DeLorean-v2/pull) and will get you added to the list below!

| Name | Name | Name |
|------|------|------|
| [DevFest KC](https://devfestkc.com) | [DevFest Muncie](https://devfestmuncie.firebaseapp.com) | [Windy City DevFest](https://windycity.devfest.io) |
| [DevFest Nairobi](https://devfestnairobi.gdgkenya.org) | [Eldoret Techweek](https://sites.gdgmoi.com) | [IWD Fresno](https://iwd.wtmfresno.com) |
| [DevFest Los Angeles](https://devfest.gdgla.org) | [Valley DevFest 2018](https://valleydevfest.com) | [WTM Taipei](https://wtm-taipei-lighting-talk-0.firebaseapp.com) |

### License

Project is published under the [MIT license](https://github.com/neojato/DeLorean-v2/blob/master/LICENSE.md).  
Feel free to clone and modify repo as you want, but don't forget to keep the reference to original authors, thanks!

###### The DeLorean Project is not endorsed and/or supported by Google, the corporation.
