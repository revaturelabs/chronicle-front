# Chronicle Front End Application
Angular application for Chronicle application

***Documentation is WIP***

## Technologies
- [Angular 11.0.2](https://angular.io/docs)
- [Karma](https://karma-runner.github.io/5.2/intro/how-it-works.html)
- [Firebase](https://firebase.google.com/docs)
* * *

## Information
Chronicle is an application in which users are able to share and view educational material. Users are able to upload media files and restrict viewing to specific users, or keep them private for themselves. Admins are able to view all media files and update privacy settings.   

## Getting Started / Contributing
The below can be used with any IDE. IDE Specific instructions will be marked as such. If additional instrucations are necessary or if you find any errors, please reach out to Cassie.

### Pre-requisites
Please ensure you have the following installed prior to cloneing this repository:
- An IDE of your choice
- Java EE 1.8 SDK
- Git
- Angular

### Setting up your git workspace
Clone the repo with:

`git clone https://github.com/Batch-908-AugustDuet/chronicle-front.git`

Once cloned, be sure to checkout the base branch your team will be working off of using

`git checkout -b [base-branch]`

And then pull all of the changes for the base-branch.
(If you have just cloned the repo, there is most likely nothing to pull but you should check anyways)

`git pull`

Now to create your branch! While still on the base-branch for your team, do:

`git checkout -b [your branch here] [the branch your are basing your branch off of]`

Then push your new branch

`git push`

### Installing Dependencies
Run the below line of code in your Angular CLI to install dependencies for this project before building
`npm install`

Run `ng serve` and navigate to `http://localhost:4200/` to make sure the application is working.

You should recieve a prompt to log in. Continue to next set of instructions if you see this prompt.

### Firebase
In order to log into the application, you will need to create an account (DO NOT USE ACTUAL LOGIN CREDENTIALS YOU NORMALLY USE) when you login to the front end on localhost:4200 for the first time. This will create a user in the account on Google Firebase. Firebase manages the users and we call Firebase to get a token for a valid user on the front end when authentication occurs. Then, when we make a request to the backend, the backend only accepts requests with a valid token from the firebase environment. The JSON information in the "firebase-service-credentials.json" (This file should NEVER be added to version control - it contains a private key for the Firebase environment - reach out to the Center of Excellence if the current iteration has any further questions about where it is, how to use it, etc.) combined with the "spring.security.oauth2.resourceserver.jwt.issuer-uri" property in the application.properties file, allows our back-end to verify valid JWTs for the Firebase instance William created.  The information in the "environment.ts" file allows our front-end to authenticate with the Firebase instance.

For asynchronous calls from the front end to the backend, follow the example of the hello.service.ts file.

### Cloning the backend to test authentication
In order to properly test authentication, you will also need to clone the backend repo.
Follow the instructions included int he README [here](https://github.com/Batch-908-AugustDuet/chronicle-storage-service).


Ensure you have ALL pre-requesites mentioned in this document before moving to the next step.

### Putting it all together.
Ensure the Backend API is running on localhost:8080 and the front is running on localhost:4200.

Test out your login and it should authenticate you once verified against the backend. If this works you are good to go!


### Requirements
Tests first, push to the remote repo, and and Open a Pull Request adding @RevatureGentry or @KennethDavis391.

### How Do I Open a Pull Request?
If you haven't opened a pull request before on Github follow the below instructions:
1) In the secondary navbar click 'Pull Requests'.
2) Click the green 'Open Pull Request' button
3) The Repo should be Batch-908-AugustDuet/... not revature labs!
4) Select your base branch (default is main)
5) Then select your feature branch
6) Add @RevatureGentry and @KennethDavis391 as approvers to your request
7) Select open pull request and viola pull request in progress! Will and Kenneth will comment once they review and merge it in if there are no issues.

### Note on tsconfig.json "skipLibCheck": true setting:
An imported library (saturn-datepicker) that integrated with angular material had a bug in one of its files that caused ng build errors:
https://github.com/SaturnTeam/saturn-datepicker/issues/157

`Error: node_modules/saturn-datepicker/datepicker/datepicker.d.ts:57:22`

`node_modules/@angular/material/core/common-behaviors/color.d.ts:15:5`

To solve this issue, we could have edited the node_module file by hand, but that would be manual for all users. Instead, we set "skipLibCheck": true in the tsconfig.json, which stops Typescript type-checking for imported libraries and only type-checks the code used against imported library types. Please see the following article for more details:
https://stackoverflow.com/questions/52311779/usage-of-the-typescript-compiler-argument-skiplibcheck

If you are able to use a more recent version of saturn-datepicker or angular material, it may be worth it to try removing the "skipLibCheck": true setting and trying ng build. If you receive no errors, then this bug will have been fixed.
* * *

