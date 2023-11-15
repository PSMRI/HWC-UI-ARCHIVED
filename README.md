# AMRIT - Health and Wellness Centre (HWC) 
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)  ![branch parameter](https://github.com/PSMRI/HWC-UI/actions/workflows/sast-and-package.yml/badge.svg)

Health and Wellness Centre (HWC) is one of the comprehensive applications of AMRIT designed to capture details of 7 Service packages as per guidelines which should be available at Health and Wellness centre.

### Primary Features
* Provide medical advice and services to beneficiaries
* Out patient service 
* Video consultation with specialists doctors
* Drug dispense and laboratory facility available at centre
* More than 20 lab tests can be performed using IOT devices and data flows directly to AMRIT
* Compliance with all 3 milestones of ABDM 
* SnomedCT, LOINC, ICD -10, FHIR compatible

### Patient Visit Category
* Ante natal care (ANC)
* Post natal care (PNC)
* Neonatal and infant health care services
* Childhood and adolescent health care services including immunisation
* Family planning, contraceptive services and other reproductive health care
* Care for acute simple illnesses and minor ailments 
* Management of communicable diseases
* National health programs (General OPD)
* Prevention, screening and management of non communicable diseases (NCD)

## Building From Source
This microservice is built on Java, Spring boot framework and MySQL DB.

### Prerequisites 
* HWC-API module should be running
* JDK 1.8
* Maven 
* Nodejs v8.9.0


## Installation
* Visual Studio Code Installation
Angular is a popular web development platform developed and maintained by Google. Angular uses TypeScript as its main programming language. The Visual Studio Code editor supports TypeScript IntelliSense and code navigation out of the box, so you can do Angular development without installing any other extension.

Download Visual Studio Code from the below link: 
https://code.visualstudio.com/download

Link for installation steps: 
https://www.educative.io/answers/how-to-install-visual-studio-code-on-windows-os


* NVM Installation
nvm - Node Version Manager. It is a tool that allows you to download and install Node.js. It allows you to pick and choose the Node.js version that you wish to use.

Download NVM form below link:
https://github.com/coreybutler/nvm-windows/releases

Steps to download nvm and node: https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi

Install Node.js using below command:
`nvm install 8.9.0`

Check Node.js version:
`node --version`

Check npm version:
`npm --version`

Using the below command to specify the version of npm that you wish to use. In our case, since we have only one version installed. Let's go with that.
 `nvm use 8.9.0`

* Angular CLI Installation
Angular CLI is a command line tool for Angular. You can install it globally using npm with the following command:
`npm install -g @angular/cli@1.7.0`

* Python Installation [ If you face any Python related error during node_modules installation]
Download Python 2.7.12
Download link: https://www.python.org/downloads/


* Setup Environment Variables
1. Add below paths in “User Environment Variables”:
%NVM_HOME%    - C:\Users\myFolder\AppData\Roaming\nvm
%NVM_SYMLINK% - C:\Program Files\nodejs

2. Add below paths in “User Environment Variables -> Path “:
C:\Python27
C:\Python27\Scripts
C:\Users\myFolder\AppData\Local\Programs\Microsoft VS Code\bin
C:\Users\ myFolder\AppData\Roaming\npm
C:\Users\ myFolder\AppData\Roaming\npm\node_modules\@angular\cli\bin
%NVM_HOME%
%NVM_SYMLINK%

3. Add below paths in “System Environment Variables”:
%NVM_HOME% - C:\Users\ myFolder \AppData\Roaming\nvm
%NVM_SYMLINK% - C:\Program Files\nodejs


4. Add below paths in “System Environment Variables -> Path “:
C:\Python27
%NVM_HOME%
%NVM_SYMLINK%
%AppData%\npm
C:\Users\ myFolder\AppData\Roaming\npm

Note: After changing environment variables, please restart your system and check again.

* Steps to clone and setup HWC-Facility-APP:
1. Clone HWC-Facility-App from GitHub fork branch in your local system using below command:
      `git clone <repository-url>`

2. Open hwc-facility-app project code in Visual Studio Code

3. Navigate to your project folder and execute below command for node_modules installation:
      `npm install`

4. If you face any error related to ng2-smart-table, execute below command:
      `npm install ng2-smart-table@1.2.1`

5. Copy environment configuration. `cp src/environments/environment.ts src/environments/environment.local.ts`. Edit the endpoints, ports and IPs as per your local running services.

6. Once node module is installed successfully, then run the project using below command:
      ng serve

By default your application will be available at ‘http://localhost:4200/’. You can access it in your browser.


### Building war files

1. To build deployable war files
```bash
mvn -B package --file pom.xml -P <profile_name>
```

The available profiles include dev, local, test, and ci.
Refer to `src/environments/environment.ci.template` file and ensure that the right environment varaibles are set for the build.

Packing with `ci` profile calls `build-ci` script in `package.json`.
It creates a `environment.ci.ts` file with all environment variables used in the generared build.

## Integrations
* Video Consultation

## Usage
All features have been exposed as REST endpoints. Refer to the SWAGGER API specification for details.

