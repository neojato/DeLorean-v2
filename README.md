# DeLorean Project - GDG DevFest Website Template

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.4 and utilizes [Firebase](https://firebase.google.com) for Database, Storage, and Hosting to create a fully functional and customizable template for your Google Developer Group's DevFest. This project has been designed to continue to be your DevFest website solution without having to create a new site or Firebase project every year. Simply update the Firebase node in the config and the site resets awaiting your next year's DevFest data. All the while preserving your previous year's data in the same Firebase project.

## Table of Contents
 - [Getting Started](#getting-started)
 - [Contributing](#contributing)
 - [Development Server](#development-server)
 - [Managing Data](#managing-data)
 - [Build](#build)
 - [Deploy](#deploy)
 - [Profit!](#profit)

## Getting Started

* Install Angular CLI (`npm install -g @angular/cli`).
* Install Firebase Tools (`npm install -g firebase-tools`).
* Clone this repository: `git clone https://github.com/neojato/DeLorean-v2.git`.
* Run `npm install` from the project root.
* Create a new [Firebase project](https://console.firebase.google.com) (if you don't have one already).
* Grab a [Google Maps API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) for your project.
* Run `firebase login` and then `firebase init` and link to your Firebase Project.
  * Select Database, Functions, and Hosting
  * Use default for Database Rules
  * Type `dist` for your public directory
  * Respond yes to configure as a single-page app
* Copy [`firebase.config.ts.template`](https://github.com/neojato/DeLorean-v2/blob/master/src/environments/firebase.config.ts.template) to `firebase.config.ts` and populate fields with your Firebase and Google Maps Keys.

## Contributing

This project is open for contributions, suggestions, and ideas. Feel free to submit a PR and/or create an [Issue](https://github.com/neojato/DeLorean-v2/issues) with bugs, suggestions, and ideas. Stars are always welcome too!

See [list of contributors](https://github.com/neojato/DeLorean-v2/graphs/contributors).

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Managing Data

### Site Setup

* From the Firebase Console, go to "Authentication" and enable the Google sign-in method.
* Log into your site using your Google account.
* From the Firebase Console, go to "Authentication" and copy the User UID for your email address.
* From the Firebase Console, go to "Database" and create a parent node called `admins` then add your copied User UID as the key with a value of `true`.
* (Optional) Replace `hero.png` and `devfest.png` with your own image of Your City or DevFest.
* (Optional) Create a [Google Analytics property](https://analytics.google.com/analytics/web/#management/Settings) and add your GA Tracking ID to `line 41` in [`index.html`](https://github.com/neojato/DeLorean-v2/blob/master/src/index.html#L41).

### Site Config

* Click the Profile dropdown in the navbar and select "Site Config" to fill out all the details for your DevFest.
* **NOTE:** The uploaded venue image is stored in Firebase Storage if you need to retrieve it later.

### Ticket Config

* Click the Profile dropdown in the navbar and select "Ticket Config" to create ticket boxes to advertise levels available for purchase to your DevFest.
* **NOTE:** The tickets auto-appear in a section on the homepage but can only be managed from this admin page.

### Speaker Management

* Click the "Speakers" link in the navbar and then click on the "Create Speaker" button to add a speaker.
* Rinse and repeat for however many speakers you have for your event.
* Check the "Featured" option to have that speaker also display on the homepage (it is recommended to set only 4  as featured speakers to maintain styling at this time).
* **NOTE:** The uploaded profile images get stored in Firebase Storage if you need to retrieve them later.

### Schedule Management

* Click the "Schedule" link in the navbar and then click on the "Create Section" button to add a section.
  * This allows you to break your schedule into sections like "Breakouts - 10:00 AM" and "Lunch".
* Click on the "Create Session" button to add a session.
* **NOTE:** It is **required** to have section(s) created in order for sessions to appear!
* **NOTE:** It is **recommended** to have added the speaker prior to adding their session.
* **NOTE:** You can Edit/Delete the session from the session's detail page.

### Sponsor Management

* Click the "Sponsors" link in the navbar and then click on the "Create Level" button to add a level.
  * This allows you to break your sponsors into customized tiered levels like "Gold", "Silver", and "Bronze".
* Click on the "Create Sponsor" button to add a sponsor.
* **NOTE:** It is **required** to have level(s) created in order for sponsors to appear!
* **NOTE:** The levels and sponsors auto-appear in a section on the homepage but can only be managed from the Sponsor page.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Deploy

Run `firebase deploy` to deploy the `dist/` directory to Firebase Hosting.

## Profit!

Congrats on launching your DevFest website!

### Who uses the template?

Please let me know if you used this template and will get you added to the list!

| Name | Name | Name |
|------|------|------|
| [GDG Kanasas City](https://devfestkc.com) |     |     |

### License

Project is published under the [MIT license](https://github.com/neojato/DeLorean-v2/blob/master/LICENSE.md).  
Feel free to clone and modify repo as you want, but don't forget to add reference to original authors, thanks!

###### The DeLorean Project is not endorsed and/or supported by Google, the corporation.
